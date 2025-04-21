import { blogPageJsonLd, blogPageMeta } from './meta'
import { Metadata } from 'next'
import { FC } from 'react'

import { getBlogPage } from '@/lib/strapi/queries/blog-page'
import { getPosts } from '@/lib/strapi/queries/posts'

import PostCollection from '@/components/features/blog/post-collection'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

const loadContent = async () => {
  const posts = await getPosts()
  const page = await getBlogPage()
  return { posts, page }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage()
  return blogPageMeta(page)
}

const Page: FC = async () => {
  const { posts, page } = await loadContent()
  const { heading, description } = page || {}

  const jsonLd = blogPageJsonLd(page)

  return (
    <PageLayout className='flex flex-col gap-8'>
      <Heading text={heading} description={description} />

      <section>
        <PostCollection posts={posts} />
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PageLayout>
  )
}

export default Page
