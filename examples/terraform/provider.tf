# This file is managed by projen. Do not edit, change the .projenrc file instead.

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
        