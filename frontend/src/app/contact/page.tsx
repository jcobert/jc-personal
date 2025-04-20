import { Metadata } from 'next'
import { FC } from 'react'

import { getContactPage } from '@/lib/strapi/queries/contact-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import ContactLink from '@/components/features/contact-page/contact-link'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

const loadContent = async () => {
  const contactPage = await getContactPage()
  return { contactPage }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage()

  const { heading, description, seo } = page || {}
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

type Props = PageParams

const Page: FC<Props> = async () => {
  const { contactPage } = await loadContent()
  const { heading, description, links } = contactPage || {}

  return (
    <PageLayout className='flex flex-col gap-16 md:gap-24'>
      <Heading text={heading} description={description} />

      <section>
        {links?.length ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-8 max-w-4xl mx-auto'>
            {links?.map((link) => <ContactLink key={link?.id} link={link} />)}
          </div>
        ) : null}
      </section>
    </PageLayout>
  )
}

export default Page
