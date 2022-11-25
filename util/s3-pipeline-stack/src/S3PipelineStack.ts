import { CfnOutput, Names, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Role } from "aws-cdk-lib/aws-iam";
import { Stage } from "aws-cdk-lib/core";
import { AddStageOpts as StageOptions } from "aws-cdk-lib/pipelines/lib/blueprint/wave";

interface Props extends StackProps {
  deploymentRoleName: string;
  synthZipFileName: string;
}

export class S3PipelineStack extends Stack {
  private pipeline: CodePipeline;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const bucket = new Bucket(this, "Bucket", { versioned: true });

    const deploymentRole = Role.fromRoleName(
      this,
      "DeploymentRole",
      props.deploymentRoleName,
      { defaultPolicyName: `DeploymentPolicy${Names.uniqueId(this)}` }
    );

    bucket.grantWrite(deploymentRole);

    const s3Source = CodePipelineSource.s3(bucket, props.synthZipFileName);
    this.pipeline = new CodePipeline(this, "Pipeline", { synth: s3Source });

    new CfnOutput(this, "PipelineAssetBucketName", {
      value: bucket.bucketName,
    });
  }

  public addStage(stage: Stage, options?: StageOptions) {
    this.pipeline.addStage(stage, options);
  }
}
