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
