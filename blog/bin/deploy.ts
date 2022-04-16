#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { StartupBlogStack } from "../src/infrastructure/StartupBlogStack";

const app = new App();

new StartupBlogStack(app, "StartupBlogStack", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "eu-central-1" },
});

app.synth();
