import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  OpenIdConnectPrincipal,
  OpenIdConnectProvider,
  PolicyStatement,
  Role,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

interface Props extends StackProps {
  githubDeploymentRoleName: string;
}

export class AccessStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const provider = new OpenIdConnectProvider(this, "GithubProvider", {
      url: "https://token.actions.githubusercontent.com",
      clientIds: ["sts.amazonaws.com"],
    });

    const role = new Role(this, "GitHubDeploymentRole", {
      roleName: props.githubDeploymentRoleName,
      description: "Role assumed by GitHub when deploying an application",
      assumedBy: new OpenIdConnectPrincipal(provider, {
        "ForAllValues:StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub":
            "repo:dbartholomae/startup-cto-blog:ref:refs/heads/main",
        },
      }),
    });

    role.addToPolicy(
      new PolicyStatement({
        actions: ["amplify:startJob"],
        resources: [
          "arn:aws:amplify:eu-central-1:112125362830:apps/d1x7ezhrw0p58x/*",
        ],
      })
    );

    new CfnOutput(this, "RoleArnOutput", {
      description: "The arn of the role to be assumed by GitHub",
      value: role.roleArn,
    });
  }
}
