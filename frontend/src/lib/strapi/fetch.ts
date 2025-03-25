import fetch from '@/utils/fetch'

/** Fetches data from the provided Strapi endpoint. */
export const strapiFetch = <TData>(path: string) => {
  const baseUrl = process.env.CMS_BASE_URL || ''
  const url = new URL(`/api${path}`, baseUrl)
  return fetch.GET<TData>({ url: url.href })
}
