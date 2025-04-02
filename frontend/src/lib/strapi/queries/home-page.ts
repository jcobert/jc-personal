import { strapiFetch } from '../fetch'
import { StrapiAPIResponse, StrapiImage } from '../types/general'
import { getStrapiApiPath } from '../utils'

export type HomePage = StrapiAPIResponse<'api::home-page.home-page'>['data'] & {
  profilePhoto?: StrapiImage
}

export const getHomePage = async (): Promise<HomePage | undefined> => {
  const res = await strapiFetch<HomePage>(getStrapiApiPath('/home-page'), {
    query: {
      populate: '*',
    },
  })
  return res?.data
}
