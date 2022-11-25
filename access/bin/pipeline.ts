#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { githubDeploymentRoleName, synthZipFileName } from "../src";
import { AccessStage } from "../infrastructure/AccessStage";
import { S3PipelineStack } from "s3-pipeline-stack";

const app = new App();

const pipelineStack = new S3PipelineStack(app, "AccessPipelineStack", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "eu-central-1" },
  deploymentRoleName: githubDeploymentRoleName,
  synthZipFileName: synthZipFileName,
});

pipelineStack.addStage(new AccessStage(pipelineStack, "AccessStage"));

app.synth();
