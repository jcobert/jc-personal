import { AboutPage as AboutPageSchema, WithContext } from 'schema-dts'

import { AboutPage } from '@/lib/strapi/queries/about-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'
import { websiteJsonLd } from '@/configuration/structured-data'

export const aboutPageMeta = (data: AboutPage | undefined) => {
  const { heading, description, seo } = data || {}
  const { metaTitle, metaDescription, keywords, metaImage, openGraph } =
    seo || {}

  return generatePageMeta({
    title: metaTitle || heading,
    description: metaDescription || description,
    url: canonicalUrl('/about'),
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

export const aboutPageJsonLd = (
  ...params: Parameters<typeof aboutPageMeta>
) => {
  const website = websiteJsonLd()
  const meta = aboutPageMeta(...params)

  const url = meta?.openGraph?.url as string

  const webPage: WithContext<AboutPageSchema> = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': url,
    name: meta?.title as string,
    description: meta?.description as string,
    url,
    isPartOf: website,
  }

  return webPage
}
