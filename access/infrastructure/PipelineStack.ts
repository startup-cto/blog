import { CfnOutput, Stack, StackProps, Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Role } from "aws-cdk-lib/aws-iam";

interface Props extends StackProps {
  deploymentRoleName: string;
  stageFactory: (scope: Construct) => Stage;
  synthZipFileName: string;
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const bucket = new Bucket(this, "Bucket", { versioned: true });

    const deploymentRole = Role.fromRoleName(
      this,
      "DeploymentRole",
      props.deploymentRoleName
    );

    bucket.grantWrite(deploymentRole);

    const s3Source = CodePipelineSource.s3(bucket, props.synthZipFileName);
    const pipeline = new CodePipeline(this, "Pipeline", { synth: s3Source });
    pipeline.addStage(props.stageFactory(this));

    new CfnOutput(this, "PipelineAssetBucketName", {
      value: bucket.bucketName,
    });
  }
}
