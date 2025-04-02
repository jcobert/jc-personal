import { Metadata } from 'next'
import { FC } from 'react'

import { getHomePage } from '@/lib/strapi/queries/home-page'
import { getProjects } from '@/lib/strapi/queries/projects'

import ProfilePhoto from '@/components/features/home-page/profile-photo'
import ProjectCard from '@/components/features/projects/project-card'
import Link from '@/components/general/link'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  const homePage = await getHomePage()
  const projects = await getProjects({ filters: { featured: true } })
  return { homePage, projects }
}

export const metadata: Metadata = {
  title: buildPageTitle('Home'),
}

const HomePage: FC = async () => {
  const { homePage, projects } = await loadContent()
  const { title, description, profilePhoto } = homePage || {}

  return (
    <PageLayout className='flex flex-col gap-10 sm:gap-16'>
      <section className='md:px-12__ lg:px-24__ md:pt-8'>
        <div className='prose max-w-none flex flex-col gap-8 max-md:mx-auto'>
          <div className='flex max-w-2xl items-center md:items-end max-md:flex-col gap-x-8 gap-y-4'>
            <h1 className='text-6xl'>{title}</h1>
            <ProfilePhoto image={profilePhoto} />
          </div>
          <p className='max-w-prose'>{description}</p>
        </div>
      </section>

      <section>
        <div className='flex flex-col gap-6'>
          <div className='prose max-w-none'>
            <h2 className='text-brand-primary font-semibold text-center mb-3'>
              My Projects
            </h2>
            <div
              aria-hidden
              className='h-px bg-gradient-to-r from-transparent via-brand-6 w-1/2 mx-auto'
            />
          </div>

          <div className='flex flex-col gap-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12'>
              {projects?.map((p) => <ProjectCard key={p?.id} project={p} />)}
            </div>

            <Link
              href='/projects'
              variant='primary'
              className='mx-auto sm:py-3 sm: px-6'
            >
              <span>View all projects</span>
              {/* <FaAngleRight aria-hidden /> */}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default HomePage
