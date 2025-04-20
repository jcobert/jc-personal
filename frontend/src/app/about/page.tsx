import { Metadata } from 'next'
import { FC } from 'react'

import { getAboutPage } from '@/lib/strapi/queries/about-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import ContentBlock from '@/components/features/about-page/content-block'
import Divider from '@/components/general/divider'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

const loadContent = async () => {
  const aboutPage = await getAboutPage()
  return { aboutPage }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage()

  const { heading, description, seo } = page || {}
  const { metaTitle, metaDescription, keywords, metaImage, openGraph } =
    seo || {}

  return generatePageMeta({
    title: metaTitle || heading,
    description: metaDescription || description,
    url: canonicalUrl('/about'),
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

type Props = PageParams

const Page: FC<Props> = async () => {
  const { aboutPage } = await loadContent()
  const { heading, description, contentBlocks } = aboutPage || {}

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
    </PageLayout>
  )
}

export default Page
