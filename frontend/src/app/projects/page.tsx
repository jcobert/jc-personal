import { Metadata } from 'next'
import { FC } from 'react'

import { strapiClient } from '@/lib/strapi/fetch'

import ProjectCard from '@/components/features/projects/project-card'
import { Project } from '@/components/features/projects/types'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  const res = await strapiClient.GET('/projects', {
    params: { query: { populate: '*' } },
  })
  return res?.data?.data as Project[]
}

export const metadata: Metadata = {
  title: buildPageTitle('Projects'),
}

const Page: FC = async () => {
  const projects = await loadContent()

  const title = 'Projects'
  const description =
    "Here's a selection of projects that I've worked on - a blend of solo creations and collaborative endeavors."

  return (
    <PageLayout>
      <section className='prose'>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>

      <section>
        {projects?.map((proj) => (
          <ProjectCard key={proj?.id || proj?.documentId} project={proj} />
        ))}
      </section>
    </PageLayout>
  )
}

export default Page
