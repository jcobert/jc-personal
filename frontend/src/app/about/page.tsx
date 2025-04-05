import { Metadata } from 'next'
import { FC } from 'react'

import { getAboutPage } from '@/lib/strapi/queries/about-page'

import ContentBlock from '@/components/features/about-page/content-block'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

const loadContent = async () => {
  const aboutPage = await getAboutPage()
  return { aboutPage }
}

export const metadata: Metadata = generatePageMeta({
  title: 'About',
  description: '',
  url: canonicalUrl('/about'),
})

type Props = PageParams

const Page: FC<Props> = async () => {
  const { aboutPage } = await loadContent()
  const { heading, description, contentBlocks } = aboutPage || {}

  return (
    <PageLayout className='flex flex-col gap-12 md:gap-24'>
      <Heading text={heading} description={description} />

      <section>
        <div className='flex flex-col gap-y-20 sm:gap-y-16 w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 mx-auto'>
          {contentBlocks?.map((block, i) => (
            <ContentBlock key={block?.id} seq={i} content={block} />
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default Page
