import { Technology } from '@/lib/strapi/types/common'
import {
  StrapiAPIResponse,
  StrapiImage,
  WithIDProperty,
} from '@/lib/strapi/types/general'

export type PostTag = WithIDProperty<
  NonNullable<
    StrapiAPIResponse<'api::post.post'>['data'][number]['tags']
  >[number]
>

export type Post = Omit<
  StrapiAPIResponse<'api::post.post'>['data'][number],
  'image' | 'technologies' | 'tags' | 'createdAt'
> & {
  image?: StrapiImage
  technologies?: Technology[]
  tags?: PostTag[]
  createdAt: string
}
