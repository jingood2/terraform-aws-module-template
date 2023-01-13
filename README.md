# Projen-CDKTF-Hybrid-Construct

Projen template for CDKTF Constructs that should also be used as Terraform Modules and for republishing Terraform Modules as Constructs.

## Usage

### `HybridModule`

If you want to write a CDKTF construct and also publish it as a Terraform Module you can use the `HybridModule` template.

You can initialize such a project using `npx projen new --from projen-cdktf-hybrid-construct hybrid-module`.

A configutation might look like this:

```js
import {
  HybridModule,
  publishToRegistries,
} from "projen-cdktf-hybrid-construct";
const project = new HybridModule({
  author: "jingood2",
  authorAddress: "jingood2@gmail.com",
  defaultReleaseBranch: "main",
  devDeps: ["projen-cdktf-hybrid-construct"],
  name: "terraform-aws-module-template",
  repositoryUrl:
    "https://github.com/jingood2/terraform-aws-module-template.git",

  // cdktfVersion: "^0.13.0",       /* Minimum target version of this library. */
  // constructExamples: undefined,  /* If set a construct examples folder will be created. */
  // ... all the other options
  ...publishToRegistries({
    name: "my-new-hybrid-construct",
    namespace: "jingood2",
    registries: ["npm"],
  }),
  // If enabled a constructs example folder will be created
  constructExamples: {
    enabled: true,
    folder: "examples/construct",
  },
  // deps: [],                      /* Runtime dependencies of this module. */
  // description: undefined,        /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,        /* The "name" in package.json. */
  // If enabled an example folder with terraform code will be created
  terraformExamples: {
    enabled: true,
    folder: "examples/terraform",
    // The configuration to add to the example terraform file
    providerConfig: `
        terraform {
          required_providers {
            aws = {
              source  = "hashicorp/aws"
              version = "~> 4.49.0"
            }
          }
          # Terraform binary version constraint
          required_version = ">= 1.3.0"
        }
        
        
        provider "aws" {
          region = "ap-northeast-2"
        }
        `,
  },
});
project.synth();
```

## Publishing

### Open Source

We have a helper method for easy configuration, but there are still some manual steps required.

#### Terraform

1. [Sign in at the registry](https://registry.terraform.io/sign-in)
2. [Select your repository](https://registry.terraform.io/github/create) and create the module

Please make sure your repository name starts with `terraform-cdk-`.

#### npm (Typescript)

1. Create an account at [npmjs.com](https://npmjs.com/)
2. Create an [automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens) on npm
3. Create a [GitHub Action Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) with the name `NPM_TOKEN` and the value of the token

### Github Packages
We have a helper method for easy configuration, no extra steps needed:

```js
const {
  HybridModule,
  publishToGithubPackages,
} = require("projen-cdktf-hybrid-construct");

const project = new HybridModule({
  // ... all the other options
  ...publishToGithubPackages({
    name: "my-new-hybrid-construct",
    namespace: "my-org",
    registries: ["npm", "maven"], // pypi and nuget are not yet supported
  }),
});
```


