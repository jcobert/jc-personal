import { StrapiAPIResponse, StrapiImage } from '@/lib/strapi/types/general'

export type Technology = Omit<
  StrapiAPIResponse<'api::technology.technology'>['data'][number],
  'image'
> & {
  image?: StrapiImage
}
