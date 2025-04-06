import { strapiFetch } from '../fetch'
import { StrapiApiPath } from '../types/general'
import { getStrapiApiPath } from '../utils'

import { Post } from '@/components/features/blog/types'

type Response<
  TSlug extends string | undefined = undefined,
  TDocumentId extends string | undefined = undefined,
> = TSlug extends string ? Post : TDocumentId extends string ? Post : Post[]

export const getPosts = async <
  TSlug extends string | undefined = undefined,
  TDocumentId extends string | undefined = undefined,
>(options?: {
  slug?: TSlug
  documentId?: TDocumentId
  filters?: { [key in keyof Post]?: unknown }
}): Promise<Response<TSlug, TDocumentId> | undefined> => {
  const { documentId, slug, filters } = options || {}

  const path = (documentId ? '/posts/{id}' : '/posts') satisfies StrapiApiPath

  const res = await strapiFetch<TDocumentId extends string ? Post : Post[]>(
    getStrapiApiPath(path, { id: documentId }),
    {
      query: {
        'populate[technologies][populate][0]': 'image',
        populate: 'image',
        /** @todo accept additional filters. */
        filters: { slug, ...filters },
      },
    },
  )

  if (slug) {
    return res?.data?.[0]
  }
  return res?.data as Response<TSlug, TDocumentId>
}
