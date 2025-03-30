import { Metadata } from 'next'
import { FC } from 'react'

import { strapiFetch } from '@/lib/strapi/fetch'

import ProjectCard from '@/components/features/projects/project-card'
import { Project } from '@/components/features/projects/types'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async () => {
  const res = await strapiFetch<Project[]>('/projects', {
    query: 'populate[technologies][populate][0]=image&populate=image',
  })
  return res?.data
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
