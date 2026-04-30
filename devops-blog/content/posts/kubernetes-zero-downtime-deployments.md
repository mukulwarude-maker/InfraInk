---
title: "Zero-Downtime Kubernetes Deployments: A Production Guide"
date: "2026-04-18"
category: "Kubernetes"
categoryColor: "#326CE5"
emoji: "⎈"
tags: ["kubernetes", "devops", "deployment"]
author: "Mukul Warude"
readTime: "12 min read"
excerpt: "Learn rolling updates, blue-green deployments, and canary releases with real-world Kubernetes YAML configurations."
---

Deploying to production without downtime is non-negotiable for modern teams. Kubernetes gives you the primitives to make it happen — but the defaults aren't always production-ready. Here's what actually works.

## Why the Default Rolling Update Isn't Enough

Kubernetes `RollingUpdate` is a great starting point, but without `readinessProbe`, `PodDisruptionBudget`, and sensible `maxUnavailable`/`maxSurge` values, you're one bad deploy away from a partial outage.

```yaml
# deployment.yaml — production-grade rolling update
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
  namespace: production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0       # never reduce below desired count
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      terminationGracePeriodSeconds: 60
      containers:
        - name: api
          image: my-registry/api:v1.2.3
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /healthz/ready
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5
            failureThreshold: 3
          livenessProbe:
            httpGet:
              path: /healthz/live
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sh", "-c", "sleep 10"]
```

Key points:
- `maxUnavailable: 0` — Kubernetes never removes a pod before a replacement is healthy
- `readinessProbe` — the replacement must pass before traffic is routed to it
- `preStop` sleep — gives the load balancer time to drain connections

## PodDisruptionBudget

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
  namespace: production
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: api
```

This prevents node drains (upgrades, maintenance) from taking out too many pods simultaneously.

## Blue-Green with Two Deployments

For higher-confidence deployments, maintain two identical deployments and switch a Service selector:

```bash
# Point traffic from blue to green
kubectl patch service api-svc \
  -p '{"spec":{"selector":{"slot":"green"}}}'
```

If green is broken, roll back instantly:

```bash
kubectl patch service api-svc \
  -p '{"spec":{"selector":{"slot":"blue"}}}'
```

## Canary Releases with Argo Rollouts

For fine-grained traffic splitting, [Argo Rollouts](https://argoproj.github.io/argo-rollouts/) is the best tool in the ecosystem:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: api-rollout
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 10    # 10% canary traffic
        - pause: {}        # manual gate
        - setWeight: 50
        - pause: {duration: 10m}
        - setWeight: 100
```

With Prometheus metrics analysis you can fully automate the promotion/abort decision.

## Summary Checklist

- [ ] Set `maxUnavailable: 0` in rolling updates
- [ ] Add `readinessProbe` and `livenessProbe`
- [ ] Add `preStop` hook for graceful drain
- [ ] Create a `PodDisruptionBudget`
- [ ] Use `terminationGracePeriodSeconds` ≥ your longest request timeout
- [ ] Consider Argo Rollouts for canary/analysis gates
