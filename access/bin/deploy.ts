#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { AccessStack } from "../src/AccessStack";

const app = new App();

new AccessStack(app, "AccessStack", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "eu-central-1" },
});

app.synth();
