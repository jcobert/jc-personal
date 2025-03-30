import { paths } from './types/api'
import { APIResponseCollectionMetadata } from './types/general'
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

/** Fetches data from the provided Strapi endpoint. */
export const strapiFetch = async <TData>(
  path: string,
  options?: { query?: string },
) => {
  const query = options?.query ? `?${options?.query}` : ''
  const baseUrl = process.env.CMS_BASE_URL || ''
  const url = new URL(`/api${path}${query}`, baseUrl)
  const res = await fetch.GET<StrapiFetchResponse<TData>>({ url: url.href })
  return res?.data
}
