import { projectPageJsonLd, projectPageMeta } from './meta'
import { Metadata } from 'next'
import { FC } from 'react'

import { getProjects } from '@/lib/strapi/queries/projects'

import ProjectPost from '@/components/features/projects/project-post'
import Back from '@/components/general/back'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

type PageProps = PageParams<{ slug: string }>

const loadContent = async ({ slug }: Awaited<PageProps['params']>) => {
  const project = await getProjects({ slug })
  return { project }
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const { project } = await loadContent({ slug })
  return projectPageMeta(slug, project)
}

export const generateStaticParams = async () => {
  const projects = await getProjects()
  return (projects || [])?.map(({ slug }) => ({ slug }))
}

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params

  const { project } = await loadContent({ slug })

  const jsonLd = projectPageJsonLd(slug, project)

  return (
    <PageLayout className='flex flex-col gap-6 sm:gap-8'>
      <Back href='/projects' text='All projects' />
      <ProjectPost project={project} />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PageLayout>
  )
}

export default Page
