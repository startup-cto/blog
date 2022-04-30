#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { AccessStage } from "../src/AccessStage";

const app = new App();

new AccessStage(app, "AccessStage", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "eu-central-1" },
});

app.synth();
