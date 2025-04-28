import { StrapiFetchOptions, strapiFetch } from '../fetch'
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
>(
  options?: StrapiFetchOptions<Post>['query'] & {
    slug?: TSlug
    documentId?: TDocumentId
  },
): Promise<Response<TSlug, TDocumentId> | undefined> => {
  const { documentId, slug, filters, ...params } = options || {}

  const path = (documentId ? '/posts/{id}' : '/posts') satisfies StrapiApiPath

  const res = await strapiFetch<
    Post,
    Response<TSlug, TDocumentId> extends any[] ? 'many' : 'one'
  >(getStrapiApiPath(path, { id: documentId }), {
    query: {
      'populate[image]': true,
      'populate[tags][populate]': '*',
      'populate[technologies][populate][image]': true,
      'populate[author][populate][photo]': true,
      filters: { slug, ...filters },
      sort: ['dateOfWork:desc'],
      ...params,
    },
  })

  if (slug) {
    return res?.data?.[0]
  }
  return res?.data as Response<TSlug, TDocumentId>
}
