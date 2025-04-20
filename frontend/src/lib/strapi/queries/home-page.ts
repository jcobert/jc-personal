import { strapiFetch } from '../fetch'
import { WithSeo } from '../types/common'
import { StrapiAPIResponse, StrapiMediaImage } from '../types/general'
import { getStrapiApiPath } from '../utils'

export type HomePage = WithSeo<
  Omit<
    StrapiAPIResponse<'api::home-page.home-page'>['data'],
    'profilePhoto' | 'seo'
  > & {
    profilePhoto?: StrapiMediaImage
  }
>

export const getHomePage = async (): Promise<HomePage | undefined> => {
  const res = await strapiFetch<HomePage>(getStrapiApiPath('/home-page'), {
    query: {
      'populate[profilePhoto]': true,
    },
    seo: true,
  })
  return res?.data
}
