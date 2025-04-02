import { Metadata } from 'next'
import { FC } from 'react'

import { getHomePage } from '@/lib/strapi/queries/home-page'

import ProfilePhoto from '@/components/features/home-page/profile-photo'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  const homePage = await getHomePage()
  return { homePage }
}

export const metadata: Metadata = {
  title: buildPageTitle('Home'),
}

const HomePage: FC = async () => {
  const { homePage } = await loadContent()
  const { title, description, profilePhoto } = homePage || {}

  return (
    <PageLayout>
      <section className='md:px-12 lg:px-24 md:pt-8'>
        <div className='prose flex flex-col gap-8 max-md:mx-auto'>
          <div className='flex items-center md:items-end max-md:flex-col gap-x-8 gap-y-4'>
            <h1>{title}</h1>
            <ProfilePhoto image={profilePhoto} />
          </div>
          <p>{description}</p>
        </div>
      </section>
    </PageLayout>
  )
}

export default HomePage
