import { Metadata } from 'next'
import { FC } from 'react'

import { strapiClient } from '@/lib/strapi/fetch'

import ProjectPost from '@/components/features/projects/project-post'
import { Project } from '@/components/features/projects/types'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { buildPageTitle } from '@/configuration/seo'

const loadContent = async ({ id }) => {
  const res = await strapiClient.GET('/projects/{id}', {
    params: { path: { id } },
  })
  return res?.data?.data as Project
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
