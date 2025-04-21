import { contactPageJsonLd, contactPageMeta } from './meta'
import { Metadata } from 'next'
import { FC } from 'react'

import { getContactPage } from '@/lib/strapi/queries/contact-page'

import ContactLink from '@/components/features/contact-page/contact-link'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

const loadContent = async () => {
  const page = await getContactPage()
  return { page }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage()
  return contactPageMeta(page)
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const { page } = await loadContent()
  const { heading, description, links } = page || {}

  const jsonLd = contactPageJsonLd(page)

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

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PageLayout>
  )
}

export default Page
