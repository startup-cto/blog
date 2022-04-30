#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { PipelineStack } from "../src/PipelineStack";
import { synthZipFileName } from "../config/synthZipFileName";
import { githubDeploymentRoleName } from "../config/githubDeploymentRoleName";
import { AccessStage } from "../src/AccessStage";
import { Construct } from "constructs";

const app = new App();

new PipelineStack(app, "AccessPipelineStack", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "eu-central-1" },
  deploymentRoleName: githubDeploymentRoleName,
  stageFactory: (scope: Construct) =>
    new AccessStage(scope, "AccessStage", { githubDeploymentRoleName }),
  synthZipFileName: synthZipFileName,
});

app.synth();
