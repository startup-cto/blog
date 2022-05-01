#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { Construct } from "constructs";
import { S3PipelineStack } from "s3-pipeline-stack";
import { AnalyticsStage } from "../src/AnalyticsStage";
import { githubDeploymentRoleName, synthZipFileName } from "access";

const app = new App();

const startupCtoEnv = { account: "112125362830", region: "eu-central-1" };
new S3PipelineStack(app, "AnalyticsPipelineStack", {
  env: startupCtoEnv,
  deploymentRoleName: githubDeploymentRoleName,
  synthZipFileName: synthZipFileName,
  stageFactory: (scope: Construct) =>
    new AnalyticsStage(scope, "AnalyticsStage", { env: startupCtoEnv }),
});

app.synth();
