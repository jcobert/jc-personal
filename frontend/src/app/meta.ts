import { WebPage, WithContext } from 'schema-dts'

import { HomePage } from '@/lib/strapi/queries/home-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'
import { websiteJsonLd } from '@/configuration/structured-data'

export const homePageMeta = (data: HomePage | undefined) => {
  const { heading, description, profilePhoto, seo } = data || {}
  const { metaTitle, metaDescription, metaImage, keywords, openGraph } =
    seo || {}

  const image = metaImage || profilePhoto

  return generatePageMeta({
    title: metaTitle || heading,
    description: metaDescription || description,
    url: canonicalUrl(),
    keywords,
    images: [
      {
        url: getStrapiImageUrl(image?.url),
        width: image?.width,
        height: image?.height,
        alt: image?.alternativeText,
      },
    ],
    openGraph: {
      title: openGraph?.ogTitle,
      description: openGraph?.ogDescription,
    },
  })
}

export const homePageJsonLd = (...params: Parameters<typeof homePageMeta>) => {
  const website = websiteJsonLd()
  const meta = homePageMeta(...params)

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
