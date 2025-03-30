import { StrapiAPIResponse, StrapiImage } from '@/lib/strapi/types/general'

export type Project =
  StrapiAPIResponse<'api::project.project'>['data'][number] & {
    image?: StrapiImage
  }

export type Technology =
  StrapiAPIResponse<'api::technology.technology'>['data'][number]
