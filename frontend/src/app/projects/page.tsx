import { Metadata } from 'next'
import { FC } from 'react'

import { getProjects } from '@/lib/strapi/queries/projects'

import ProjectCollection from '@/components/features/projects/project-collection'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  const projects = await getProjects()
  return { projects }
}

export const metadata: Metadata = {
  title: buildPageTitle('Projects'),
}

const Page: FC = async () => {
  const { projects } = await loadContent()

  const heading = 'Projects'
  const description =
    "Here's a selection of projects that I've worked on - a blend of solo creations and collaborative endeavors."

  return (
    <PageLayout className='flex flex-col gap-8'>
      <Heading text={heading} description={description} />

      <section>
        <ProjectCollection projects={projects} />
      </section>
    </PageLayout>
  )
}

export default Page
