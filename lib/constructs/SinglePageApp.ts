import { Construct, SecretValue } from "@aws-cdk/core";
import { App, GitHubSourceCodeProvider } from "@aws-cdk/aws-amplify";

export interface SinglePageAppProps {
}

export default class SinglePageApp extends Construct {

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
      }
    });

    app.addBranch("main",{
      autoBuild: true,
      branchName: "main"
    });

  }
}
