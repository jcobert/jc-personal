import { WebPage, WithContext } from 'schema-dts'

import { ProjectsPage } from '@/lib/strapi/queries/projects-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'
import { websiteJsonLd } from '@/configuration/structured-data'

export const projectsPageMeta = (data: ProjectsPage | undefined) => {
  const { heading, description, seo } = data || {}
  const { metaTitle, metaDescription, metaImage, keywords, openGraph } =
    seo || {}

  return generatePageMeta({
    title: metaTitle || heading,
    description: metaDescription || description,
    url: canonicalUrl('/projects'),
    keywords,
    images: metaImage?.url
      ? [
          {
            url: getStrapiImageUrl(metaImage?.url),
            width: metaImage?.width,
            height: metaImage?.height,
            alt: metaImage?.alternativeText,
          },
        ]
      : undefined,
    openGraph: {
      title: openGraph?.ogTitle,
      description: openGraph?.ogDescription,
    },
  })
}

export const projectsPageJsonLd = (
  ...params: Parameters<typeof projectsPageMeta>
) => {
  const website = websiteJsonLd()
  const meta = projectsPageMeta(...params)

  const url = meta?.openGraph?.url as string

  const webPage: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    name: meta?.title as string,
    description: meta?.description as string,
    url,
    isPartOf: website,
  }

  return webPage
}
