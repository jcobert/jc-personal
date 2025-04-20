import { Metadata } from 'next'
import { FC } from 'react'

import { getBlogPage } from '@/lib/strapi/queries/blog-page'
import { getPosts } from '@/lib/strapi/queries/posts'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import PostCollection from '@/components/features/blog/post-collection'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

const loadContent = async () => {
  const posts = await getPosts()
  const page = await getBlogPage()
  return { posts, page }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage()

  const { heading, description, seo } = page || {}
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

const Page: FC = async () => {
  const { posts, page } = await loadContent()
  const { heading, description } = page || {}

  return (
    <PageLayout className='flex flex-col gap-8'>
      <Heading text={heading} description={description} />

      <section>
        <PostCollection posts={posts} />
      </section>
    </PageLayout>
  )
}

export default Page
