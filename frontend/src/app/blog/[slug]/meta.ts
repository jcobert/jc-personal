import { BlogPosting, WithContext } from 'schema-dts'

import { fullName } from '@/utils/string'

import { Post } from '@/components/features/blog/types'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl, siteConfig } from '@/configuration/site'
import { personJsonLd, websiteJsonLd } from '@/configuration/structured-data'

export const postPageMeta = (slug: string, post: Post | undefined) => {
  const { title, description, image, author, publishedAt } = post || {}

  return generatePageMeta({
    title: `Blog - ${title}`,
    description,
    url: canonicalUrl(`/blog/${slug}`),
    authors: {
      name: fullName(author?.firstName, author?.lastName),
      url: siteConfig?.url,
    },
    images: [
      {
        url: image?.url || '',
        width: image?.width,
        height: image?.height,
        alt: image?.alternativeText,
      },
    ],
    openGraph: { type: 'article', publishedTime: publishedAt?.toString() },
  })
}

export const postPageJsonLd = (...params: Parameters<typeof postPageMeta>) => {
  const website = websiteJsonLd()
  const meta = postPageMeta(...params)

  const [, post] = params

  const url = meta?.openGraph?.url as string

  const webPage: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    name: meta?.title as string,
    description: meta?.description as string,
    url,
    author: personJsonLd(),
    creator: personJsonLd(),
    datePublished: post?.publishedAt?.toString(),
    isPartOf: website,
  }

  return webPage
}
