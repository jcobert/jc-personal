import { strapiFetch } from '../fetch'
import { StrapiAPIResponse, WithIDProperty } from '../types/general'
import { getStrapiApiPath } from '../utils'

export type ContactLink = WithIDProperty<
  NonNullable<
    StrapiAPIResponse<'api::contact-page.contact-page'>['data']['links']
  >[number]
>

export type ContactPage = Omit<
  StrapiAPIResponse<'api::contact-page.contact-page'>['data'],
  'links'
> & {
  links?: ContactLink[]
}

export const getContactPage = async () => {
  const res = await strapiFetch<ContactPage>(
    getStrapiApiPath('/contact-page'),
    {
      query: {
        'populate[0]': 'links',
      },
    },
  )
  return res?.data
}
