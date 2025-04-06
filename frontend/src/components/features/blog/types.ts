import { Technology } from '@/lib/strapi/types/common'
import { StrapiAPIResponse, StrapiImage } from '@/lib/strapi/types/general'

export type PostTag = NonNullable<
  StrapiAPIResponse<'api::post.post'>['data'][number]['tags']
>[number]

export type Post = Omit<
  StrapiAPIResponse<'api::post.post'>['data'][number],
  'image' | 'technologies' | 'tags'
> & {
  image?: StrapiImage
  technologies?: Technology[]
  tags?: PostTag[]
}
