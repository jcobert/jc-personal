import { strapiFetch } from '../fetch'
import { WithSeo } from '../types/common'
import { StrapiAPIResponse } from '../types/general'
import { getStrapiApiPath } from '../utils'

export type ProjectsPage = WithSeo<
  StrapiAPIResponse<'api::projects-page.projects-page'>['data']
>

export const getProjectsPage = async (): Promise<ProjectsPage | undefined> => {
  const res = await strapiFetch<ProjectsPage>(
    getStrapiApiPath('/projects-page'),
    {
      seo: true,
    },
  )
  return res?.data
}
