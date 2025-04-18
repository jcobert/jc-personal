import { Metadata } from 'next'
import { FC } from 'react'

import { getPosts } from '@/lib/strapi/queries/posts'

import BlogPost from '@/components/features/blog/blog-post'
import Back from '@/components/general/back'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

type PageProps = PageParams<{ slug: string }>

const loadContent = async ({ slug }: Awaited<PageProps['params']>) => {
  const post = await getPosts({ slug })
  return { post }
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const { post } = await loadContent({ slug })

  const { title, image } = post || {}

  return generatePageMeta({
    title: `Blog - ${title}`,
    url: canonicalUrl(`/blog/${slug}`),
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

export const generateStaticParams = async () => {
  const posts = await getPosts()
  return (posts || [])?.map(({ slug }) => ({ slug }))
}

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params

  const { post } = await loadContent({ slug })

  return (
    <PageLayout className='flex flex-col gap-6 sm:gap-8'>
      <Back href='/blog' text='All Posts' />
      <BlogPost post={post} />
    </PageLayout>
  )
}

export default Page
