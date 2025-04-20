import { strapiFetch } from '../fetch'
import { WithSeo } from '../types/common'
import {
  StrapiAPIResponse,
  StrapiMediaImage,
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
    image?: StrapiMediaImage
  }
>

export type AboutPage = WithSeo<
  Omit<
    StrapiAPIResponse<'api::about-page.about-page'>['data'],
    'contentBlocks'
  > & {
    contentBlocks?: ContentBlock[]
  }
>

export const getAboutPage = async (): Promise<AboutPage | undefined> => {
  const res = await strapiFetch<AboutPage>(getStrapiApiPath('/about-page'), {
    query: {
      'populate[contentBlocks][populate][image]': true,
    },
    seo: true,
  })
  return res?.data
}
