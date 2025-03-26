import { Metadata } from 'next'
import { FC } from 'react'

import { strapiClient } from '@/lib/strapi/fetch'

import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  const res = await strapiClient.GET('/home-page')
  return res?.data?.data
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
