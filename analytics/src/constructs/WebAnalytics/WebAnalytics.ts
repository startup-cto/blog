import { Construct } from "constructs";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import {
  ApiKey,
  LambdaIntegration,
  RestApi,
  UsagePlan,
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { analyticsEventInputSchema } from "./model/AnalyticsEventInput";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";

interface Props {
  publicApiKey: string;
  certificate: ICertificate;
  origin: string;
  domainName: string;
}

export class WebAnalytics extends Construct {
  public readonly api: RestApi;

  constructor(
    scope: Construct,
    id: string,
    { certificate, origin, domainName, publicApiKey }: Props
  ) {
    super(scope, id);
    const timeToLiveAttribute = "ttl";

    const dynamoDBPartitionKey = "scatter";
    const dynamoDBSortKey = "timestamp";

    const events = new Table(this, "Events", {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: dynamoDBPartitionKey,
        type: AttributeType.NUMBER,
      },
      sortKey: {
        name: dynamoDBSortKey,
        type: AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      timeToLiveAttribute,
    });

    const handlerEnvironment = {
      DYNAMODB_TABLE: events.tableName,
      DYNAMODB_TTL_ATTRIBUTE: timeToLiveAttribute,
      DYNAMODB_PARTITION_KEY: dynamoDBPartitionKey,
      DYNAMODB_SORT_KEY: dynamoDBSortKey,
      MAX_SCATTER: "1",
    };

    const collectEventHandler = new NodejsFunction(
      this,
      "CollectEventHandler",
      {
        environment: handlerEnvironment,
      }
    );

    const getEventsByMonthHandler = new NodejsFunction(
      this,
      "GetEventsByMonthHandler",
      {
        environment: handlerEnvironment,
        timeout: Duration.minutes(1),
      }
    );

    const api = new RestApi(this, "Api", {
      domainName: {
        domainName,
        certificate,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: [
          `https://${origin}`,
          `http://localhost:3000`,
          `http://localhost:6006`,
        ],
      },
    });

    const analyticsEventModel = api.addModel("AnalyticsEvent", {
      modelName: "AnalyticsEvent",
      contentType: "application/json",
      schema: analyticsEventInputSchema,
    });
    const collectEventMethod = api.root.addMethod(
      "POST",
      new LambdaIntegration(collectEventHandler),
      {
        apiKeyRequired: true,
        requestModels: {
          "application/json": analyticsEventModel,
        },
        requestValidatorOptions: {
          requestValidatorName: "Validate body",
          validateRequestBody: true,
        },
      }
    );
    const getEventsByMonthMethod = api.root.addMethod(
      "GET",
      new LambdaIntegration(getEventsByMonthHandler),
      {
        apiKeyRequired: true,
      }
    );

    const plan = new UsagePlan(this, "ReadUsagePlan", {
      throttle: {
        rateLimit: 10,
        burstLimit: 100,
      },
    });
    plan.addApiStage({
      stage: api.deploymentStage,
      throttle: [
        {
          method: getEventsByMonthMethod,
          throttle: {
            rateLimit: 1,
            burstLimit: 1,
          },
        },
        {
          method: collectEventMethod,
          throttle: {
            rateLimit: 10,
            burstLimit: 100,
          },
        },
      ],
    });

    plan.addApiKey(
      new ApiKey(this, "WebAnalyticsApiKey", { value: publicApiKey })
    );

    events.grantReadData(getEventsByMonthHandler);
    events.grantWriteData(collectEventHandler);
    this.api = api;
  }
}
