import { Metadata } from 'next'
import { FC } from 'react'

import { getProjects } from '@/lib/strapi/queries/projects'
import { getProjectsPage } from '@/lib/strapi/queries/projects-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import ProjectCollection from '@/components/features/projects/project-collection'
import Heading from '@/components/layout/heading'
import PageLayout from '@/components/layout/page-layout'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

const loadContent = async () => {
  const projects = await getProjects()
  const page = await getProjectsPage()
  return { projects, page }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProjectsPage()

  const { heading, description, seo } = page || {}
  const { metaTitle, metaDescription, metaImage, keywords, openGraph } =
    seo || {}

  return generatePageMeta({
    title: metaTitle || heading,
    description: metaDescription || description,
    url: canonicalUrl('/projects'),
    keywords,
    images: [
      {
        url: getStrapiImageUrl(metaImage?.url),
        width: metaImage?.width,
        height: metaImage?.height,
        alt: metaImage?.alternativeText,
      },
    ],
    openGraph: {
      title: openGraph?.ogTitle,
      description: openGraph?.ogDescription,
    },
  })
}

const Page: FC = async () => {
  const { projects, page } = await loadContent()
  const { heading, description } = page || {}

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
