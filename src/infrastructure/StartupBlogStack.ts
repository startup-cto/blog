import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { WebAnalytics } from "./constructs/WebAnalytics/WebAnalytics";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { ApiGateway } from "aws-cdk-lib/aws-route53-targets";
import { domainName, fullDomainName } from "./constants/domainName";

export class StartupBlogStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName,
    });

    const certificate = new Certificate(this, "Certificate", {
      domainName: fullDomainName,
      validation: CertificateValidation.fromDns(hostedZone),
    });

    const analytics = new WebAnalytics(this, "WebAnalytics", {
      certificate,
      domainName: fullDomainName,
    });

    new ARecord(this, "AnalyticsAPIDomainAliasRecord", {
      zone: hostedZone,
      recordName: fullDomainName,
      target: RecordTarget.fromAlias(new ApiGateway(analytics.api)),
    });

    new CfnOutput(this, "ApiUrl", {
      value: analytics.api.url,
    });
  }
}
