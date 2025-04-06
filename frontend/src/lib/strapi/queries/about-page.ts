import { strapiFetch } from '../fetch'
import {
  StrapiAPIResponse,
  StrapiImage,
  WithIDProperty,
} from '../types/general'
import { getStrapiApiPath } from '../utils'

export type ContentBlock = WithIDProperty<
  Omit<
    NonNullable<
      StrapiAPIResponse<'api::about-page.about-page'>['data']['contentBlocks']
    >[number],
    'image'
  > & {
    image?: StrapiImage
  }
>

export type AboutPage = Omit<
  StrapiAPIResponse<'api::about-page.about-page'>['data'],
  'contentBlocks'
> & {
  contentBlocks?: ContentBlock[]
}

export const getAboutPage = async (): Promise<AboutPage | undefined> => {
  const res = await strapiFetch<AboutPage>(getStrapiApiPath('/about-page'), {
    query: {
      'populate[0]': 'contentBlocks',
      'populate[1]': 'contentBlocks.image',
    },
  })
  return res?.data
}
