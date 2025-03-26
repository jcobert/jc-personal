import { paths } from './types/api'
import createClient from 'openapi-fetch'
import qs from 'qs'

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

// /** Fetches data from the provided Strapi endpoint. */
// export const strapiFetch = <TData>(path: string) => {
//   const baseUrl = process.env.CMS_BASE_URL || ''
//   const url = new URL(`/api${path}`, baseUrl)
//   return fetch.GET<TData>({ url: url.href })
// }
