import { ContactPage as ContactPageSchema, WithContext } from 'schema-dts'

import { ContactPage } from '@/lib/strapi/queries/contact-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'
import { websiteJsonLd } from '@/configuration/structured-data'

export const contactPageMeta = (data: ContactPage | undefined) => {
  const { heading, description, seo } = data || {}
  const { metaTitle, metaDescription, keywords, metaImage, openGraph } =
    seo || {}

  return generatePageMeta({
    title: metaTitle || heading,
    description: metaDescription || description,
    url: canonicalUrl('/contact'),
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

export const contactPageJsonLd = (
  ...params: Parameters<typeof contactPageMeta>
) => {
  const website = websiteJsonLd()
  const meta = contactPageMeta(...params)

  const url = meta?.openGraph?.url as string

  const webPage: WithContext<ContactPageSchema> = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': url,
    name: meta?.title as string,
    description: meta?.description as string,
    url,
    isPartOf: website,
  }

  return webPage
}
