import { Construct, Stack, StackProps, CfnOutput } from "@aws-cdk/core";
import SinglePageApp from "../constructs/SinglePageApp";

export default class Template extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new SinglePageApp(this, 'SinglePageApp', {});

  }
}
