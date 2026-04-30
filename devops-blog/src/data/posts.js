// Static post data for UI components (cards, featured, etc.)
// Real posts are loaded from Markdown files in content/posts/

export const categories = [
  { name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5', count: 12, icon: '⎈' },
  { name: 'Docker', slug: 'docker', color: '#2496ED', count: 9, icon: '🐳' },
  { name: 'CI/CD', slug: 'ci-cd', color: '#F05133', count: 15, icon: '🔄' },
  { name: 'Terraform', slug: 'terraform', color: '#7B42BC', count: 7, icon: '🏗️' },
  { name: 'AWS', slug: 'aws', color: '#FF9900', count: 18, icon: '☁️' },
  { name: 'Monitoring', slug: 'monitoring', color: '#E6522C', count: 6, icon: '📊' },
  { name: 'Security', slug: 'security', color: '#00B4A8', count: 8, icon: '🔐' },
  { name: 'Linux', slug: 'linux', color: '#FCC624', count: 11, icon: '🐧' },
];

export const featuredPosts = [
  {
    id: '1',
    title: 'Zero-Downtime Kubernetes Deployments: A Production Guide',
    excerpt:
      'Learn rolling updates, blue-green deployments, and canary releases with real-world Kubernetes YAML configurations. We cover readiness probes, PodDisruptionBudgets, and Helm hooks.',
    category: 'Kubernetes',
    categoryColor: '#326CE5',
    date: 'April 18, 2026',
    readTime: '12 min read',
    tags: ['kubernetes', 'devops', 'deployment'],
    slug: '/blog/kubernetes-zero-downtime-deployments',
    featured: true,
    emoji: '⎈',
  },
  {
    id: '2',
    title: 'Building a GitOps Pipeline with ArgoCD and GitHub Actions',
    excerpt:
      'Step-by-step guide to setting up a complete GitOps workflow: from code commit to production deployment using ArgoCD, Helm, and GitHub Actions OIDC authentication.',
    category: 'CI/CD',
    categoryColor: '#F05133',
    date: 'April 10, 2026',
    readTime: '15 min read',
    tags: ['gitops', 'argocd', 'github-actions'],
    slug: '/blog/gitops-argocd-github-actions',
    featured: true,
    emoji: '🔄',
  },
  {
    id: '3',
    title: 'Terraform at Scale: Modules, Workspaces & State Management',
    excerpt:
      'Managing multi-environment infrastructure with Terraform modules, remote state backends, and workspace strategies. Includes patterns for large teams and monorepos.',
    category: 'Terraform',
    categoryColor: '#7B42BC',
    date: 'April 3, 2026',
    readTime: '10 min read',
    tags: ['terraform', 'iac', 'aws'],
    slug: '/blog/terraform-at-scale',
    featured: true,
    emoji: '🏗️',
  },
];

export const recentPosts = [
  {
    id: '4',
    title: 'Docker Multi-Stage Builds That Actually Cut Image Size',
    excerpt:
      'Practical multi-stage Docker patterns for Go, Node.js, and Python apps. Real before/after comparisons showing 80% image size reduction.',
    category: 'Docker',
    categoryColor: '#2496ED',
    date: 'April 25, 2026',
    readTime: '8 min read',
    tags: ['docker', 'containers', 'optimization'],
    slug: '/blog/docker-multi-stage-builds',
    emoji: '🐳',
  },
  {
    id: '5',
    title: 'AWS EKS vs Self-Managed Kubernetes: The Real Trade-offs',
    excerpt:
      'An honest comparison covering cost, operational overhead, control plane access, and upgrade strategies. Includes a decision framework for teams.',
    category: 'AWS',
    categoryColor: '#FF9900',
    date: 'April 22, 2026',
    readTime: '9 min read',
    tags: ['aws', 'eks', 'kubernetes'],
    slug: '/blog/aws-eks-vs-self-managed',
    emoji: '☁️',
  },
  {
    id: '6',
    title: 'Prometheus + Grafana: Production Alerting That Works',
    excerpt:
      'Alert fatigue is real. Learn to write PromQL alert rules with proper thresholds, inhibition, and silencing strategies.',
    category: 'Monitoring',
    categoryColor: '#E6522C',
    date: 'April 19, 2026',
    readTime: '11 min read',
    tags: ['prometheus', 'grafana', 'monitoring'],
    slug: '/blog/prometheus-grafana-alerting',
    emoji: '📊',
  },
  {
    id: '7',
    title: 'Hardening Linux Servers: An Engineer\'s Checklist',
    excerpt:
      'SSH hardening, fail2ban, firewall rules, audit logging, and immutable infrastructure patterns. A practical security checklist for production servers.',
    category: 'Security',
    categoryColor: '#00B4A8',
    date: 'April 14, 2026',
    readTime: '7 min read',
    tags: ['linux', 'security', 'hardening'],
    slug: '/blog/linux-server-hardening',
    emoji: '🔐',
  },
  {
    id: '8',
    title: 'GitHub Actions Caching Strategies for Faster CI',
    excerpt:
      'Cache node_modules, Docker layers, Go modules, and build artifacts effectively. Real pipeline benchmarks showing 4x speedup.',
    category: 'CI/CD',
    categoryColor: '#F05133',
    date: 'April 8, 2026',
    readTime: '6 min read',
    tags: ['github-actions', 'ci-cd', 'performance'],
    slug: '/blog/github-actions-caching',
    emoji: '🔄',
  },
  {
    id: '9',
    title: 'Linux Kernel cgroups for Container Resource Limits',
    excerpt:
      'Deep dive into cgroups v2, how Docker and Kubernetes use them, and how to debug OOMKilled containers effectively.',
    category: 'Linux',
    categoryColor: '#FCC624',
    date: 'April 1, 2026',
    readTime: '14 min read',
    tags: ['linux', 'kernel', 'containers'],
    slug: '/blog/linux-cgroups-containers',
    emoji: '🐧',
  },
];
