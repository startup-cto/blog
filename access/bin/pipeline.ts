#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { synthZipFileName } from "../config/synthZipFileName";
import { githubDeploymentRoleName } from "../config/githubDeploymentRoleName";
import { AccessStage } from "../src/AccessStage";
import { Construct } from "constructs";
import { S3PipelineStack } from "s3-pipeline-stack";

const app = new App();

new S3PipelineStack(app, "AccessPipelineStack", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "eu-central-1" },
  deploymentRoleName: githubDeploymentRoleName,
  stageFactory: (scope: Construct) => new AccessStage(scope, "AccessStage"),
  synthZipFileName: synthZipFileName,
});

app.synth();
