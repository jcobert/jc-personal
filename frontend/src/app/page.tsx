import { Metadata } from 'next'
import { FC } from 'react'

import { strapiFetch } from '@/lib/strapi/fetch'

import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  /** @todo Replace with generated type when available. */
  const res = await strapiFetch<{ title?: string; description?: string }>(
    '/home-page',
  )
  return res?.data
}

export const metadata: Metadata = {
  title: buildPageTitle('Home'),
}

const HomePage: FC = async () => {
  const data = await loadContent()

  return (
    <PageLayout>
      <section className='prose'>
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
      </section>
    </PageLayout>
  )
}

export default HomePage
