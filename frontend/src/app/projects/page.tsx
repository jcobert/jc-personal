import { Metadata } from 'next'
import { FC } from 'react'

import { getProjects } from '@/lib/strapi/queries/projects'

import ProjectCard from '@/components/features/projects/project-card'
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

  const title = 'Projects'
  const description =
    "Here's a selection of projects that I've worked on - a blend of solo creations and collaborative endeavors."

  return (
    <PageLayout>
      {/* <section className='prose'>
        <h1>{title}</h1>
        <p>{description}</p>
      </section> */}
      <Heading text={title} description={description} />
      {/* <p>{description}</p> */}

      <section>
        {projects?.map((proj) => <ProjectCard key={proj?.id} project={proj} />)}
      </section>
    </PageLayout>
  )
}

export default Page
