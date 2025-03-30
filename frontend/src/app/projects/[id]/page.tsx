import { Metadata } from 'next'
import { FC } from 'react'

import { strapiFetch } from '@/lib/strapi/fetch'

import ProjectPost from '@/components/features/projects/project-post'
import { Project } from '@/components/features/projects/types'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async ({ id }) => {
  const res = await strapiFetch<Project>(`/projects/${id}`, {
    query: 'populate[technologies][populate][0]=image&populate=image',
  })
  return res?.data
}

export const metadata: Metadata = {
  title: buildPageTitle('Projects'),
}

const Page: FC<PageParams<{ id: string }>> = async ({ params }) => {
  const { id } = await params

  const data = await loadContent({ id })

  return (
    <PageLayout>
      <ProjectPost project={data} />
    </PageLayout>
  )
}

export default Page
