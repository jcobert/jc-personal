import { paths } from './types/api'
import { APIResponseCollectionMetadata } from './types/general'
import { queryWithSeo } from './utils'
import createClient from 'openapi-fetch'
import qs from 'qs'

import fetch from '@/utils/fetch'

/** Client to fetch data from Strapi API. */
export const strapiClient = createClient<paths>({
  baseUrl: `${process.env.CMS_BASE_URL}/api`,
  headers: { Accept: 'application/json' },
  querySerializer: (params) => {
    return qs.stringify(params, {
      encodeValuesOnly: true,
    })
  },
})

export type StrapiFetchResponse<TData> = {
  data: TData
  meta: APIResponseCollectionMetadata
}

export type StrapiFetchOptions<
  TData extends Record<string, unknown>,
  // TFields extends Record<string, unknown>,
> = {
  query?: {
    fields?: (keyof TData)[]
    sort?: (keyof TData | `${Extract<keyof TData, string>}:${'asc' | 'desc'}`)[]
    filters?: {
      [key in keyof TData]?: unknown
    }
    pagination?: {
      limit?: number
      start?: number
      pageSize?: number
      page?: number
    }
    [key: string]: unknown
  }
  seo?: boolean
}

/** Fetches data from the provided Strapi endpoint. */
export const strapiFetch = async <
  // TData extends Record<string, unknown> | Record<string, unknown>[],
  TData extends Record<string, unknown>,
  TScope extends 'one' | 'many' = 'many',
>(
  path: string,
  options?: StrapiFetchOptions<TData>,
) => {
  const queryParams = options?.seo
    ? queryWithSeo(options?.query)
    : options?.query

  const queryString = queryParams
    ? qs.stringify(queryParams, { skipNulls: true, allowEmptyArrays: false })
    : ''

  const query = queryString ? `?${queryString}` : ''

  const baseUrl = process.env.CMS_BASE_URL || ''
  const url = new URL(`/api${path}${query}`, baseUrl)
  const res = await fetch.GET<
    StrapiFetchResponse<TScope extends 'many' ? TData[] : TData>
  >({ url: url.href })
  return res?.data
}
