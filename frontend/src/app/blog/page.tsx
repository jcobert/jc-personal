import { Metadata } from 'next'
import { FC } from 'react'

import { getPosts } from '@/lib/strapi/queries/posts'

import PostCollection from '@/components/features/blog/post-collection'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  const posts = await getPosts()
  return { posts }
}

export const metadata: Metadata = {
  title: buildPageTitle('Blog'),
}

const heading = 'Blog'
const description =
  'Posts about anything I feel is worthwhile sharing with the world.'

const Page: FC = async () => {
  const { posts } = await loadContent()

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
