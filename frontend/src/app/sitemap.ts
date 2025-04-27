import { MetadataRoute } from 'next'

import { getPosts } from '@/lib/strapi/queries/posts'
import { getProjects } from '@/lib/strapi/queries/projects'

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL || ''

  // Dynamic project routes
  const projects = await getProjects()
  const projectRoutes = (projects || [])?.map(
    (proj) =>
      ({
        url: `${BASE_URL}/projects/${proj?.slug}`,
        lastModified: (proj?.publishedAt as string) || new Date(),
        changeFrequency: 'monthly',
        // priority: 0.5,
      }) satisfies MetadataRoute.Sitemap[number],
  )

  // Dynamic blog post routes
  const posts = await getPosts()
  const postRoutes = (posts || [])?.map(
    (post) =>
      ({
        url: `${BASE_URL}/blog/${post?.slug}`,
        lastModified: (post?.publishedAt as string) || new Date(),
        changeFrequency: 'weekly',
        // priority: 0.5,
      }) satisfies MetadataRoute.Sitemap[number],
  )

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      // priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      // priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      // priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      // priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      // priority: 0.7,
    },
    ...projectRoutes,
    ...postRoutes,
  ]
}

export default sitemap
