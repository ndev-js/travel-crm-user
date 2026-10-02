export type DeployStatus = 'ready' | 'building' | 'error'

export interface Project {
  id: string
  name: string
  domain: string
  repo: string
  commit: string
  branch: string
  updated: string
  framework: string
  status: DeployStatus
}

export interface Deployment {
  id: string
  project: string
  url: string
  environment: 'Production' | 'Preview'
  status: DeployStatus
  branch: string
  commit: string
  duration: string
  age: string
  author: string
}

export interface UsageItem {
  label: string
  used: number
  limit: number
  unit: string
}

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'acme-web',
    domain: 'acme-web.vercel.app',
    repo: 'acme/acme-web',
    commit: 'feat: add pricing page',
    branch: 'main',
    updated: '2h ago',
    framework: 'Next.js',
    status: 'ready',
  },
  {
    id: 'p2',
    name: 'docs-site',
    domain: 'docs.acme.dev',
    repo: 'acme/docs',
    commit: 'docs: update API reference',
    branch: 'main',
    updated: '1d ago',
    framework: 'Astro',
    status: 'ready',
  },
  {
    id: 'p3',
    name: 'storefront',
    domain: 'shop.acme.dev',
    repo: 'acme/storefront',
    commit: 'fix: cart total rounding',
    branch: 'fix/cart-total',
    updated: '3h ago',
    framework: 'Remix',
    status: 'building',
  },
  {
    id: 'p4',
    name: 'admin-portal',
    domain: 'admin-portal.vercel.app',
    repo: 'acme/admin',
    commit: 'chore: bump dependencies',
    branch: 'main',
    updated: '5d ago',
    framework: 'Vite',
    status: 'error',
  },
  {
    id: 'p5',
    name: 'blog',
    domain: 'blog.acme.dev',
    repo: 'acme/blog',
    commit: 'post: launch week recap',
    branch: 'main',
    updated: '1w ago',
    framework: 'Next.js',
    status: 'ready',
  },
  {
    id: 'p6',
    name: 'design-system',
    domain: 'design.acme.dev',
    repo: 'acme/design-system',
    commit: 'feat: new Button variants',
    branch: 'main',
    updated: '2w ago',
    framework: 'SvelteKit',
    status: 'ready',
  },
]

export const deployments: Deployment[] = [
  {
    id: 'd1',
    project: 'storefront',
    url: 'storefront-3k9xq.vercel.app',
    environment: 'Preview',
    status: 'building',
    branch: 'fix/cart-total',
    commit: 'fix: cart total rounding',
    duration: '—',
    age: '3h ago',
    author: 'Sara K.',
  },
  {
    id: 'd2',
    project: 'acme-web',
    url: 'acme-web-7fj2p.vercel.app',
    environment: 'Production',
    status: 'ready',
    branch: 'main',
    commit: 'feat: add pricing page',
    duration: '42s',
    age: '2h ago',
    author: 'Omar R.',
  },
  {
    id: 'd3',
    project: 'docs-site',
    url: 'docs-site-q81zd.vercel.app',
    environment: 'Production',
    status: 'ready',
    branch: 'main',
    commit: 'docs: update API reference',
    duration: '1m 8s',
    age: '1d ago',
    author: 'Lina M.',
  },
  {
    id: 'd4',
    project: 'admin-portal',
    url: 'admin-portal-x20ab.vercel.app',
    environment: 'Preview',
    status: 'error',
    branch: 'main',
    commit: 'chore: bump dependencies',
    duration: '23s',
    age: '5d ago',
    author: 'Omar R.',
  },
  {
    id: 'd5',
    project: 'blog',
    url: 'blog-n4c8w.vercel.app',
    environment: 'Production',
    status: 'ready',
    branch: 'main',
    commit: 'post: launch week recap',
    duration: '37s',
    age: '1w ago',
    author: 'Lina M.',
  },
]

export const usage: UsageItem[] = [
  { label: 'Fast Data Transfer', used: 38.2, limit: 100, unit: 'GB' },
  { label: 'Edge Requests', used: 412, limit: 1000, unit: 'K' },
  { label: 'Function Invocations', used: 61, limit: 100, unit: 'K' },
  { label: 'Build Execution', used: 4.1, limit: 6, unit: 'h' },
]

export const tabs = [
  'Overview',
  'Integrations',
  'Deployments',
  'Activity',
  'Domains',
  'Usage',
  'Observability',
  'Storage',
  'Settings',
] as const

export type Tab = (typeof tabs)[number]
