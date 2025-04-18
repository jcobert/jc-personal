import { Metadata } from 'next'
import { FC } from 'react'

import { getHomePage } from '@/lib/strapi/queries/home-page'
import { getProjects } from '@/lib/strapi/queries/projects'

import ProfilePhoto from '@/components/features/home-page/profile-photo'
import ProjectCard from '@/components/features/projects/project-card'
import Divider from '@/components/general/divider'
import Link from '@/components/general/link'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  const homePage = await getHomePage()
  const projects = await getProjects({ filters: { featured: true } })
  // const posts = await getPosts({ pagination: { limit: 3 } })
  return { homePage, projects }
}

export const metadata: Metadata = {
  title: buildPageTitle('Home'),
}

const HomePage: FC = async () => {
  const { homePage, projects } = await loadContent()
  const { title, description, profilePhoto } = homePage || {}

  return (
    <PageLayout className='flex flex-col gap-12 sm:gap-16 md:gap-24'>
      <section className='md:pt-8'>
        <div className='prose max-w-none flex flex-col gap-8 max-md:mx-auto'>
          <div className='flex max-w-2xl items-center md:items-end max-md:flex-col gap-x-8 gap-y-4'>
            <h1 className='max-sm:text-[2.625rem] sm:text-6xl text-balance'>
              {title}
            </h1>
            <ProfilePhoto image={profilePhoto} />
          </div>
          <p className='max-w-[64ch]'>{description}</p>
        </div>
      </section>

      {projects?.length ? (
        <section>
          <div className='flex flex-col gap-6 md:gap-10'>
            <div className='prose max-w-none'>
              <h2 className='text-brand-primary font-semibold text-center mb-3'>
                My Projects
              </h2>
              <Divider />
            </div>

            <div className='flex flex-col gap-12'>
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12'>
                {projects?.map((p) => <ProjectCard key={p?.id} project={p} />)}
                <div className='md:max-w-2xl rounded md:border xl:border-none bg-brand-1 border-gray-4 flex items-center xl:col-start-2'>
                  <Link
                    href='/projects'
                    variant='primary'
                    className='mx-auto sm:py-3 sm: px-6 self-center'
                  >
                    <span>View all projects</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* {posts?.length ? (
        <section>
          <div className='flex flex-col gap-6 md:gap-10'>
            <div className='prose max-w-none'>
              <h2 className='text-brand-primary font-semibold text-center mb-3'>
                Blog Posts
              </h2>
              <Divider />
            </div>

            <div className='flex flex-col gap-12'>
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12'>
                {posts?.map((p) => <PostCard key={p?.id} post={p} />)}
                <div className='md:max-w-2xl rounded md:border xl:border-none bg-brand-1 border-gray-4 flex items-center xl:col-start-2'>
                  <Link
                    href='/projects'
                    variant='primary'
                    className='mx-auto sm:py-3 sm: px-6 self-center'
                  >
                    <span>View all posts</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null} */}
    </PageLayout>
  )
}

export default HomePage
