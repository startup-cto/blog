#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { AnalyticsStack } from "../src/AnalyticsStack";

const app = new App();

new AnalyticsStack(app, "StartupBlogStack", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "eu-central-1" },
});

app.synth();
