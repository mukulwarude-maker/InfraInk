---
title: "Building a GitOps Pipeline with ArgoCD and GitHub Actions"
date: "2026-04-10"
category: "CI/CD"
categoryColor: "#F05133"
emoji: "🔄"
tags: ["gitops", "argocd", "github-actions"]
author: "Mukul Warude"
readTime: "15 min read"
excerpt: "Step-by-step guide to setting up a complete GitOps workflow from code commit to production using ArgoCD and OIDC."
---

GitOps is the practice of using Git as the single source of truth for your infrastructure and application state. ArgoCD continuously reconciles your cluster to match what's declared in Git. Combined with GitHub Actions for CI, you get a robust, auditable delivery pipeline.

## Architecture Overview

```
Developer → GitHub PR → GitHub Actions (CI: build, test, push image)
                      ↓
              Update image tag in manifests repo
                      ↓
              ArgoCD detects drift → syncs cluster
```

## Step 1: Set Up ArgoCD

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f \
  https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Get initial admin password
kubectl get secret argocd-initial-admin-secret \
  -n argocd \
  -o jsonpath="{.data.password}" | base64 -d
```

## Step 2: Create an ArgoCD Application

```yaml
# argocd-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/my-org/k8s-manifests
    targetRevision: main
    path: apps/my-api
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true      # Remove resources deleted from Git
      selfHeal: true   # Revert manual cluster changes
    syncOptions:
      - CreateNamespace=true
```

## Step 3: GitHub Actions CI Pipeline

Use OIDC authentication — no long-lived AWS/GCP credentials stored as GitHub secrets.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]

permissions:
  id-token: write
  contents: read

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/github-actions-ecr
          aws-region: us-east-1

      - name: Login to ECR
        id: ecr-login
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ steps.ecr-login.outputs.registry }}/my-api:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Update manifest
        run: |
          git clone https://x-access-token:${{ secrets.MANIFESTS_PAT }}@github.com/my-org/k8s-manifests.git
          cd k8s-manifests
          sed -i "s|image: .*my-api:.*|image: ${{ steps.ecr-login.outputs.registry }}/my-api:${{ github.sha }}|" apps/my-api/deployment.yaml
          git config user.email "ci@myorg.com"
          git config user.name "CI Bot"
          git add apps/my-api/deployment.yaml
          git commit -m "chore: bump my-api to ${{ github.sha }}"
          git push
```

## Step 4: ArgoCD Image Updater (Optional Automation)

Instead of the `sed` approach above, [ArgoCD Image Updater](https://argocd-image-updater.readthedocs.io) can automatically propose PRs when new images are pushed.

```yaml
# annotation on your ArgoCD Application
metadata:
  annotations:
    argocd-image-updater.argoproj.io/image-list: my-api=my-registry/my-api
    argocd-image-updater.argoproj.io/my-api.update-strategy: digest
    argocd-image-updater.argoproj.io/write-back-method: git
```

## Rollback Is Just a Git Revert

One of the biggest GitOps wins: rollback is a `git revert`. ArgoCD detects the change and syncs the cluster back to the previous state within seconds.

```bash
git revert HEAD --no-edit
git push origin main
# ArgoCD will auto-sync within 3 minutes, or trigger manually:
argocd app sync my-api
```
