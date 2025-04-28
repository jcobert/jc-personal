import { StrapiFetchOptions, strapiFetch } from '../fetch'
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
>(
  options?: StrapiFetchOptions<Project>['query'] & {
    slug?: TSlug
    documentId?: TDocumentId
  },
): Promise<Response<TSlug, TDocumentId> | undefined> => {
  const { documentId, slug, filters } = options || {}

  const path = (
    documentId ? '/projects/{id}' : '/projects'
  ) satisfies StrapiApiPath

  const res = await strapiFetch<
    // TDocumentId extends string ? Project : Project[],
    Project,
    Response<TSlug, TDocumentId> extends any[] ? 'many' : 'one'
  >(getStrapiApiPath(path, { id: documentId }), {
    query: {
      'populate[image]': true,
      'populate[technologies][populate][image]': true,
      filters: { slug, ...filters },
      sort: ['dateOfWork:desc'],
    },
  })

  if (slug) {
    return res?.data?.[0]
  }
  return res?.data as Response<TSlug, TDocumentId>
}
