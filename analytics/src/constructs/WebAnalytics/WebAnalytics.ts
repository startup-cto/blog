import { Construct } from "constructs";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import {
  ApiKey,
  LambdaRestApi,
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

    const handler = new NodejsFunction(this, "Handler", {
      environment: {
        DYNAMODB_TABLE: events.tableName,
        DYNAMODB_TTL_ATTRIBUTE: timeToLiveAttribute,
        DYNAMODB_PARTITION_KEY: dynamoDBPartitionKey,
        DYNAMODB_SORT_KEY: dynamoDBSortKey,
        MAX_SCATTER: "1",
      },
      timeout: Duration.minutes(1),
    });

    const api = new LambdaRestApi(this, "Api", {
      handler,
      proxy: false,
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
    const collectEventMethod = api.root.addMethod("POST", undefined, {
      apiKeyRequired: true,
      requestModels: {
        "application/json": analyticsEventModel,
      },
      requestValidatorOptions: {
        requestValidatorName: "Validate body",
        validateRequestBody: true,
      },
    });
    const getStatisticsMethod = api.root.addMethod("GET", undefined, {
      apiKeyRequired: true,
    });

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
          method: getStatisticsMethod,
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

    events.grantReadWriteData(handler);
    this.api = api;
  }
}
