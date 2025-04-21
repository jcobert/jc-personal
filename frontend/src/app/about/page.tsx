import { aboutPageJsonLd, aboutPageMeta } from './meta'
import { Metadata } from 'next'
import { FC } from 'react'

import { getAboutPage } from '@/lib/strapi/queries/about-page'

import ContentBlock from '@/components/features/about-page/content-block'
import Divider from '@/components/general/divider'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

const loadContent = async () => {
  const page = await getAboutPage()
  return { page }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage()
  return aboutPageMeta(page)
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const { page } = await loadContent()
  const { heading, description, contentBlocks } = page || {}

  const jsonLd = aboutPageJsonLd(page)

  return (
    <PageLayout className='flex flex-col gap-12 md:gap-24'>
      <Heading text={heading} description={description} />

      <section>
        <div className='flex flex-col gap-y-12 mx-auto'>
          {contentBlocks?.map((block, i) => (
            <div key={block?.id} className='flex flex-col gap-10 md:gap-12'>
              <ContentBlock seq={i} content={block} />
              {i < contentBlocks?.length - 1 ? <Divider /> : null}
            </div>
          ))}
        </div>
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PageLayout>
  )
}

export default Page
