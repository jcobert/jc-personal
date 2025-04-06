import { Technology } from '@/lib/strapi/types/common'
import { StrapiAPIResponse, StrapiImage } from '@/lib/strapi/types/general'

export type Project = Omit<
  StrapiAPIResponse<'api::project.project'>['data'][number],
  'image' | 'technologies'
> & {
  image?: StrapiImage
  technologies?: Technology[]
}
