import { Construct, SecretValue, CfnOutput } from "@aws-cdk/core";
import { App, GitHubSourceCodeProvider } from "@aws-cdk/aws-amplify";
import { BuildSpec } from "@aws-cdk/aws-codebuild";

export interface SinglePageAppProps {
}

export default class SinglePageApp extends Construct {
  public readonly appId: string;
  constructor(scope: Construct, id: string, props: SinglePageAppProps) {
    super(scope, id);

    const { 
    } = props;

    const app = new App(this, "FrontEnd", {
      sourceCodeProvider: new GitHubSourceCodeProvider({
        oauthToken: SecretValue.plainText(process.env.O_AUTH_TOKEN ||''),
        owner: process.env.SOURCE_CODE_OWNER || '',
        repository: process.env.REPOSITORY || ''
      }),
      environmentVariables: {
        "NODE_ENV": process.env.ENV || "",
        "VUE_APP_COLOR": process.env.COLOR || "",
      },
      // Custom Build
      buildSpec: BuildSpec.fromObject({
        version: '1.0',
        frontend: {
          phases: {
            build: {
              commands: [
                'npm run build',
              ]
            }
          },
          artifacts: {
            baseDirectory: "dist",
            files: ["**/*"]
          },
          cache: {
            paths: ["dist/**/*"]
          }
        }
      }),
        
    });

    app.addBranch("main",{
      autoBuild: true,
      branchName: "main"
    });

    this.appId = app.appId;

    new CfnOutput(this, "appId", {
      value: app.appId,
      exportName: "appId"
    });

  }
}
