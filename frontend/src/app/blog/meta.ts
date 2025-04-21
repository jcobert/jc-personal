import { WebPage, WithContext } from 'schema-dts'

import { BlogPage } from '@/lib/strapi/queries/blog-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'
import { websiteJsonLd } from '@/configuration/structured-data'

export const blogPageMeta = (data: BlogPage | undefined) => {
  const { heading, description, seo } = data || {}
  const { metaTitle, metaDescription, metaImage, keywords, openGraph } =
    seo || {}

  return generatePageMeta({
    title: metaTitle || heading,
    description: metaDescription || description,
    url: canonicalUrl('/blog'),
    keywords,
    images: [
      {
        url: getStrapiImageUrl(metaImage?.url),
        width: metaImage?.width,
        height: metaImage?.height,
        alt: metaImage?.alternativeText,
      },
    ],
    openGraph: {
      title: openGraph?.ogTitle,
      description: openGraph?.ogDescription,
    },
  })
}

export const blogPageJsonLd = (...params: Parameters<typeof blogPageMeta>) => {
  const website = websiteJsonLd()
  const meta = blogPageMeta(...params)

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
