import { Construct } from "constructs";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";
import { LambdaRestApi, RestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { analyticsEventInputSchema } from "./AnalyticsEventInput";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";

interface Props {
  certificate: ICertificate;
  domainName: string;
}

export class WebAnalytics extends Construct {
  public readonly api: RestApi;

  constructor(
    scope: Construct,
    id: string,
    { certificate, domainName }: Props
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
    });

    const api = new LambdaRestApi(this, "Api", {
      handler,
      proxy: false,
      domainName: {
        domainName,
        certificate,
      },
    });

    const analyticsEventModel = api.addModel("AnalyticsEvent", {
      modelName: "AnalyticsEvent",
      contentType: "application/json",
      schema: analyticsEventInputSchema,
    });
    api.root.addMethod("POST", undefined, {
      requestModels: {
        "application/json": analyticsEventModel,
      },
      requestValidatorOptions: {
        requestValidatorName: "Validate body",
        validateRequestBody: true,
      },
    });
    api.root.addMethod("GET");

    events.grantReadWriteData(handler);
    this.api = api;
  }
}
