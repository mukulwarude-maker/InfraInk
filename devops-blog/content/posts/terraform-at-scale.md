---
title: "Terraform at Scale: Modules, Workspaces & State Management"
date: "2026-04-03"
category: "Terraform"
categoryColor: "#7B42BC"
emoji: "🏗️"
tags: ["terraform", "iac", "aws"]
author: "Mukul Warude"
readTime: "10 min read"
excerpt: "Managing multi-environment infrastructure with Terraform modules, remote state backends, and workspace strategies for large teams."
---

As your infrastructure grows, naïve Terraform usage — a single flat `main.tf` with everything — becomes a liability. Here's a battle-tested structure that scales to dozens of environments and multiple teams.

## Repository Structure

```
infra/
├── modules/
│   ├── vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── eks-cluster/
│   └── rds/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   ├── staging/
│   └── production/
└── .github/
    └── workflows/
        └── terraform.yml
```

## Remote State with S3 + DynamoDB Locking

```hcl
# environments/production/backend.tf
terraform {
  backend "s3" {
    bucket         = "my-tf-state-prod"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
```

Bootstrap the bucket and lock table once:

```bash
aws s3api create-bucket \
  --bucket my-tf-state-prod \
  --region us-east-1

aws dynamodb create-table \
  --table-name terraform-state-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

## Writing Reusable Modules

A good module has one job. Keep it small:

```hcl
# modules/vpc/variables.tf
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
}

variable "availability_zones" {
  description = "List of AZs to use"
  type        = list(string)
}
```

```hcl
# environments/production/main.tf
module "vpc" {
  source = "../../modules/vpc"

  vpc_cidr           = "10.1.0.0/16"
  environment        = "production"
  availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]
}
```

## CI/CD for Terraform

```yaml
# .github/workflows/terraform.yml
name: Terraform

on:
  pull_request:
    paths: ["infra/**"]
  push:
    branches: [main]
    paths: ["infra/**"]

permissions:
  id-token: write
  contents: read
  pull-requests: write

jobs:
  plan:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: infra/environments/production
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.8.0"

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/terraform-ci
          aws-region: us-east-1

      - run: terraform init
      - run: terraform validate
      - id: plan
        run: terraform plan -out=tfplan -no-color 2>&1 | tee plan.txt

      - name: Comment plan on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const plan = fs.readFileSync('infra/environments/production/plan.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `\`\`\`\n${plan.slice(0, 60000)}\n\`\`\``
            });
```

## Key Principles

1. **One state file per environment** — never share state across `dev` and `production`
2. **Use `-target` sparingly** — it's a footgun for drift
3. **Pin provider versions** — use `required_providers` with `~>` constraints
4. **Sensitive outputs** — always mark secrets as `sensitive = true`
5. **Drift detection** — run `terraform plan` on a schedule and alert on non-empty plans
