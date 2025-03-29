import { Metadata } from 'next'
import { FC } from 'react'

import { strapiClient } from '@/lib/strapi/fetch'

import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  const res = await strapiClient.GET('/projects')
  return res?.data?.data
}

export const metadata: Metadata = {
  title: buildPageTitle('Projects'),
}

const Page: FC = async () => {
  const data = await loadContent()

  const title = 'Projects'
  const description =
    "Here's a selection of projects that I've worked on - a blend of solo creations and collaborative endeavors."

  return (
    <PageLayout>
      <section className='prose'>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
    </PageLayout>
  )
}

export default Page
