import { Construct } from "constructs";
import {
  AttributeType,
  BillingMode,
  StreamViewType,
  Table,
} from "aws-cdk-lib/aws-dynamodb";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { StartingPosition } from "aws-cdk-lib/aws-lambda";
import { AwsIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { statisticsSchema } from "./Statistics";

export class WebAnalytics extends Construct {
  public readonly apiUrl: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    const timeToLiveAttribute = "ttl";

    const events = new Table(this, "Events", {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      timeToLiveAttribute,
      stream: StreamViewType.NEW_IMAGE,
    });

    const statistics = new Table(this, "Statistics", {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      timeToLiveAttribute,
    });

    const api = new RestApi(this, "Api");
    const analytics = api.root.addResource("analytics");
    const oneYearInSeconds = 60 * 60 * 24 * 365;
    const collectEventRole = new Role(this, "CollectEventRole", {
      assumedBy: new ServicePrincipal("apigateway.amazonaws.com"),
    });
    events.grantWriteData(collectEventRole);
    analytics.addMethod(
      "POST",
      new AwsIntegration({
        service: "dynamodb",
        action: "PutItem",
        actionParameters: {
          TableName: events.tableName,
          "Item.ttl.S": `{$context.requestTimeEpoch + ${oneYearInSeconds}}`,
          "Item.data.S": "$input.body",
        },
        options: {
          credentialsRole: collectEventRole,
        },
      })
    );

    const retrieveEventRole = new Role(this, "RetrieveEventRole", {
      assumedBy: new ServicePrincipal("apigateway.amazonaws.com"),
    });
    events.grantReadData(retrieveEventRole);

    const retrieveEventsModel = api.addModel("RetrieveEventsModel", {
      schema: statisticsSchema,
    });

    analytics.addMethod(
      "GET",
      new AwsIntegration({
        service: "dynamodb",
        action: "Scan",
        options: {
          credentialsRole: retrieveEventRole,
          requestTemplates: {
            "application/json": JSON.stringify({
              TableName:
                "StartupBlogStack-WebAnalyticsEvents5E68279C-2GOXG67HS20G",
              Limit: 10,
            }),
          },
          integrationResponses: [
            {
              statusCode: "200",
              responseTemplates: {
                "application/json": `#set($inputRoot = $input.path('$'))
{
  "count": $inputRoot.Count,
  "items": $inputRoot.Items,
}`,
              },
            },
          ],
        },
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseModels: { "application/json": retrieveEventsModel },
          },
        ],
      }
    );

    this.apiUrl = `${api.url}analytics`;

    const aggregateEvent = new NodejsFunction(this, "aggregateEvent", {
      entry: join(__dirname, "./aggregateEvent.ts"),
    });

    aggregateEvent.addEventSource(
      new DynamoEventSource(events, {
        startingPosition: StartingPosition.TRIM_HORIZON,
        batchSize: 10,
        maxBatchingWindow: Duration.minutes(5),
      })
    );

    statistics.grantWriteData(aggregateEvent);
  }
}
