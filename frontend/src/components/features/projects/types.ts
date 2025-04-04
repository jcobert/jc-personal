import { StrapiAPIResponse, StrapiImage } from '@/lib/strapi/types/general'

export type Technology = Omit<
  StrapiAPIResponse<'api::technology.technology'>['data'][number],
  'image'
> & {
  image?: StrapiImage
}

export type Project = Omit<
  StrapiAPIResponse<'api::project.project'>['data'][number],
  'image' | 'technologies'
> & {
  image?: StrapiImage
  technologies?: Technology[]
}
