import { strapiFetch } from '../fetch'
import { StrapiApiPath } from '../types/general'
import { getStrapiApiPath } from '../utils'

import { Project } from '@/components/features/projects/types'

type Response<
  TSlug extends string | undefined = undefined,
  TDocumentId extends string | undefined = undefined,
> = TSlug extends string
  ? Project
  : TDocumentId extends string
    ? Project
    : Project[]

export const getProjects = async <
  TSlug extends string | undefined = undefined,
  TDocumentId extends string | undefined = undefined,
>(options?: {
  slug?: TSlug
  documentId?: TDocumentId
}): Promise<Response<TSlug, TDocumentId> | undefined> => {
  const { documentId, slug } = options || {}

  const path = (
    documentId ? '/projects/{id}' : '/projects'
  ) satisfies StrapiApiPath

  const res = await strapiFetch<
    TDocumentId extends string ? Project : Project[]
  >(getStrapiApiPath(path, { id: documentId }), {
    query: {
      'populate[technologies][populate][0]': 'image',
      populate: 'image',
      filters: { slug },
    },
  })

  if (slug) {
    return res?.data?.[0]
  }
  return res?.data as Response<TSlug, TDocumentId>
}
