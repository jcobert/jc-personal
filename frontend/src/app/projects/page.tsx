import { projectsPageJsonLd, projectsPageMeta } from './meta'
import { Metadata } from 'next'
import { FC } from 'react'

import { getProjects } from '@/lib/strapi/queries/projects'
import { getProjectsPage } from '@/lib/strapi/queries/projects-page'

import ProjectCollection from '@/components/features/projects/project-collection'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

const loadContent = async () => {
  const projects = await getProjects()
  const page = await getProjectsPage()
  return { projects, page }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProjectsPage()
  return projectsPageMeta(page)
}

const Page: FC = async () => {
  const { projects, page } = await loadContent()
  const { heading, description } = page || {}

  const jsonLd = projectsPageJsonLd(page)

  return (
    <PageLayout className='flex flex-col gap-8'>
      <Heading text={heading} description={description} />

      <section>
        <ProjectCollection projects={projects} />
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PageLayout>
  )
}

export default Page
