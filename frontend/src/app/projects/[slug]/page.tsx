import { Metadata } from 'next'
import { FC } from 'react'

import { getProjects } from '@/lib/strapi/queries/projects'

import ProjectPost from '@/components/features/projects/project-post'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

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

  const { title, shortDescription, image } = project || {}

  return generatePageMeta({
    title: `Projects - ${title}`,
    description: shortDescription,
    url: canonicalUrl(`/projects/${slug}`),
    images: [
      {
        url: image?.url || '',
        width: image?.width,
        height: image?.height,
        alt: image?.alternativeText,
      },
    ],
  })
}

export const generateStaticParams = async () => {
  const projects = await getProjects()
  return projects?.map(({ slug }) => ({ slug }))
}

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params

  const { project } = await loadContent({ slug })

  return (
    <PageLayout>
      <ProjectPost project={project} />
    </PageLayout>
  )
}

export default Page
