import { Technology } from '@/lib/strapi/types/common'
import {
  StrapiAPIResponse,
  StrapiMediaImage,
  WithIDProperty,
} from '@/lib/strapi/types/general'

export type Person = Omit<
  StrapiAPIResponse<'api::person.person'>['data'][number],
  'photo'
> & { photo?: StrapiMediaImage }

export type PostTag = WithIDProperty<
  NonNullable<
    StrapiAPIResponse<'api::post.post'>['data'][number]['tags']
  >[number]
>

export type Post = Omit<
  StrapiAPIResponse<'api::post.post'>['data'][number],
  'image' | 'technologies' | 'tags' | 'createdAt' | 'author'
> & {
  image?: StrapiMediaImage
  technologies?: Technology[]
  tags?: PostTag[]
  createdAt: string
  author?: Person
}
