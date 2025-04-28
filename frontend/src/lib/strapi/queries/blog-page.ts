import { strapiFetch } from '../fetch'
import { WithSeo } from '../types/common'
import { StrapiAPIResponse } from '../types/general'
import { getStrapiApiPath } from '../utils'

export type BlogPage = WithSeo<
  StrapiAPIResponse<'api::blog-page.blog-page'>['data']
>

export const getBlogPage = async (): Promise<BlogPage | undefined> => {
  const res = await strapiFetch<BlogPage, 'one'>(
    getStrapiApiPath('/blog-page'),
    {
      seo: true,
    },
  )
  return res?.data
}
