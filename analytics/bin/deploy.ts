#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { AnalyticsStage } from "../src/AnalyticsStage";

const app = new App();

new AnalyticsStage(app, "AnalyticsStage", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "eu-central-1" },
});

app.synth();
