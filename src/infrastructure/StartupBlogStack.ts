import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { WebAnalytics } from "./constructs/WebAnalytics/WebAnalytics";

export class StartupBlogStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const analytics = new WebAnalytics(this, "WebAnalytics");

    new CfnOutput(this, "ApiUrl", {
      value: analytics.apiUrl,
    });
  }
}
