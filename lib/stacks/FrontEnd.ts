import { Construct, Stack, StackProps, CfnOutput, Aws } from "@aws-cdk/core";
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "@aws-cdk/custom-resources";
import SinglePageApp from "../constructs/SinglePageApp";

export default class Template extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const app = new SinglePageApp(this, 'SinglePageApp', {});

    const now = new Date().toISOString();
    const customResource = new AwsCustomResource(this, `AmplifyBuild${now}`, {
      installLatestAwsSdk: false,
      onCreate: {
        service: "Amplify",
        action: "startJob",
        parameters: {
          appId: app.appId,
          branchName: "main",
          jobType: "RELEASE",
        },
        physicalResourceId: PhysicalResourceId.of('id'),
        // ignoreErrorCodesMatching: ".*",
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({resources: AwsCustomResourcePolicy.ANY_RESOURCE})
    });

    
  }
}
