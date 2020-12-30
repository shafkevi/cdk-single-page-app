# CDK Template

<!-- ![Architecture](architecture.svg) -->

## Setup

  1. Install CDK globally: `npm install -g aws-cdk`
  2. Install local Node.js dependencies: `npm install`
  3. Build the project: `npm run build`
  4. Bootstrap the CDK Toolkit into your AWS account: `cdk bootstrap`
  5. Ensure your Environment variables are set:
     1. O_AUTH_TOKEN = Github Personal Access Token to the repository to build.
     2. REPOSITORY = the name of the repository. `cdk-single-page-app` for example
     3. SOURCE_CODE_OWNER = the name of the organization or individual that the repo is owned by. `shafkevi` for example
  6. Deploy the stack: `cdk deploy -c image-tag=[latest|plain-text]`

## Useful Commands

  * `npm run build` compile project to `dist`
  * `npm run clean` delete everything in `cdk.out` and `dist`
  * `npm run watch` watch for changes and compile
  * `cdk deploy` deploy this stack to your default AWS account/region
  * `cdk diff` compare deployed stack with current state
  * `cdk synth` emits the synthesized CloudFormation template

