import { strapiFetch } from '../fetch'
import { WithSeo } from '../types/common'
import { StrapiAPIResponse, WithIDProperty } from '../types/general'
import { getStrapiApiPath } from '../utils'

export type ContactLink = WithIDProperty<
  NonNullable<
    StrapiAPIResponse<'api::contact-page.contact-page'>['data']['links']
  >[number]
>

export type ContactPage = WithSeo<
  Omit<StrapiAPIResponse<'api::contact-page.contact-page'>['data'], 'links'> & {
    links?: ContactLink[]
  }
>

export const getContactPage = async () => {
  const res = await strapiFetch<ContactPage>(
    getStrapiApiPath('/contact-page'),
    {
      query: {
        'populate[links]': true,
      },
      seo: true,
    },
  )
  return res?.data
}
