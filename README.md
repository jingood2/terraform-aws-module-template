# Projen-CDKTF-Hybrid-Construct

Terraform 모듈로도 사용되어야 하고 Terraform 모듈을 구성으로 다시 게시하기 위한 CDKTF 구성에 대한 Projen 템플릿입니다.

## Usage

### `HybridModule`

CDKTF 구성을 작성하고 Terraform 모듈로 게시하려는 경우 `HybridModule` 템플릿을 사용할 수 있습니다.

이 리포지토리를 Clone 하여 CDKTF로 Terraform 모듈을 개발하고 Publish 하기 위한 템플릿으로 사용할 수 있습니다.

이러한 프로젝트는 `npx projen new --from projen-cdktf-hybrid-construct hybrid-module`을 사용하여 초기화할 수 있습니다.

projenrc.ts 파일의 구성 내용은 다음과 같습니다 


```js
import {
  HybridModule,
  publishToRegistries,
} from "projen-cdktf-hybrid-construct";
const project = new HybridModule({
  author: "jingood2",   // 변경 필요 
  authorAddress: "jingood2@gmail.com",  // 변경 필요 
  defaultReleaseBranch: "main",
  devDeps: ["projen-cdktf-hybrid-construct"],
  name: "terraform-aws-module-template", // 변경 필요 
  repositoryUrl:
    // 변경 필요 
    "https://github.com/jingood2/terraform-aws-module-template.git",

  // cdktfVersion: "^0.13.0",       /* Minimum target version of this library. */
  // constructExamples: undefined,  /* If set a construct examples folder will be created. */
  // ... all the other options
  ...publishToRegistries({
    name: "my-new-hybrid-construct", // 변경 필요
    namespace: "jingood2",  // 변경 필요
    registries: ["npm"],
  }),
  // 아래 내용을 추가하면 CDKTF Construct 예시 폴더가 생성됩니다.
  constructExamples: {
    enabled: true,
    folder: "examples/construct",
  },
  // deps: [],                      /* Runtime dependencies of this module. */
  // description: undefined,        /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,        /* The "name" in package.json. */
  // 아래 내용을 추가하면 Terraform Module Example 폴더가 생성됩니다.
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

손쉬운 구성을 위한 도우미 방법이 있지만 여전히 몇 가지 수동 단계가 필요합니다.

#### Terraform

1. [Sign in at the registry](https://registry.terraform.io/sign-in)
2. [Select your repository](https://registry.terraform.io/github/create) and create the module

Module을 Terraform Registry에 추가하기 위해서는 리포지토리 이름이 `terraform-cdk-`로 시작해야 합니다 

#### npm (Typescript)

1. Create an account at [npmjs.com](https://npmjs.com/)
2. Create an [automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens) on npm
3. Create a [GitHub Action Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) with the name `NPM_TOKEN` and the value of the token

### Github Packages
Github에 Terraform Module 을 Publish 하는 경우, 쉬운 구성을 위한 도우미 방법이 있으며 추가 단계가 필요하지 않습니다.

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
    registries: ["npm"],
  }),
});
```


