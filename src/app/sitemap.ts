import { type MetadataRoute } from 'next'

import { getAllArticles } from '@/lib/articles'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.beipeter.com'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/about', priority: 0.8 },
    { path: '/articles', priority: 0.8 },
    { path: '/projects', priority: 0.8 },
    { path: '/speaking', priority: 0.8 },
    { path: '/uses', priority: 0.6 },
    { path: '/legal', priority: 0.3 },
    { path: '/privacy', priority: 0.3 },
  ]

  const articles = await getAllArticles()

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
