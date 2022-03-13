import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { WebAnalytics } from "./constructs/WebAnalytics/WebAnalytics";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { ApiGateway } from "aws-cdk-lib/aws-route53-targets";
import { domainName, origin } from "./constants/domainName";
import { publicApiKey } from "./constants/publicApiKey";

export class StartupBlogStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName: origin,
    });

    const certificate = new Certificate(this, "Certificate", {
      domainName: domainName,
      validation: CertificateValidation.fromDns(hostedZone),
    });

    const analytics = new WebAnalytics(this, "WebAnalytics", {
      certificate,
      origin: origin,
      domainName: domainName,
      publicApiKey,
    });

    new ARecord(this, "AnalyticsAPIDomainAliasRecord", {
      zone: hostedZone,
      recordName: domainName,
      target: RecordTarget.fromAlias(new ApiGateway(analytics.api)),
    });
  }
}
