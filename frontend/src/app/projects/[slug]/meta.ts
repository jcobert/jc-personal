import { BlogPosting, WithContext } from 'schema-dts'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { Project } from '@/components/features/projects/types'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'
import { personJsonLd, websiteJsonLd } from '@/configuration/structured-data'

export const projectPageMeta = (slug: string, project: Project | undefined) => {
  const { title, shortDescription, image } = project || {}

  return generatePageMeta({
    title: `Projects - ${title}`,
    description: shortDescription,
    url: canonicalUrl(`/projects/${slug}`),
    images: [
      {
        url: image?.url || '',
        width: image?.width,
        height: image?.height,
        alt: image?.alternativeText,
      },
    ],
  })
}

export const projectPageJsonLd = (
  ...params: Parameters<typeof projectPageMeta>
) => {
  const website = websiteJsonLd()
  const meta = projectPageMeta(...params)

  const [, project] = params

  const url = meta?.openGraph?.url as string

  const webPage: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    name: meta?.title as string,
    headline: meta?.title as string,
    image: getStrapiImageUrl(project?.image?.url),
    description: meta?.description as string,
    url,
    author: personJsonLd(),
    creator: personJsonLd(),
    isPartOf: website,
  }

  return webPage
}
