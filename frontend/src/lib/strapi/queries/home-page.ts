import { strapiFetch } from '../fetch'
import { StrapiAPIResponse, StrapiMediaImage } from '../types/general'
import { getStrapiApiPath } from '../utils'

export type HomePage = StrapiAPIResponse<'api::home-page.home-page'>['data'] & {
  profilePhoto?: StrapiMediaImage
}

export const getHomePage = async (): Promise<HomePage | undefined> => {
  const res = await strapiFetch<HomePage>(getStrapiApiPath('/home-page'), {
    query: {
      populate: '*',
    },
  })
  return res?.data
}
