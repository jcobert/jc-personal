import { StrapiApiPath, StrapiMediaImage } from './types/general'
import { template, templateSettings } from 'lodash'

export const getStrapiUrl = () => {
  return process.env.CMS_BASE_URL ?? 'http://localhost:1337'
}

export const getStrapiImageUrl = (url: string | undefined) => {
  if (!url) return ''
  if (
    url?.startsWith('data:') ||
    url?.startsWith('http') ||
    url.startsWith('//')
  )
    return url
  return `${getStrapiUrl()}${url}`
}

export const getStrapiApiPath = (
  url: StrapiApiPath,
  params?: Record<string, unknown>,
) => {
  if (!params) return url
  templateSettings.interpolate = /{([\s\S]+?)}/g
  return template(url)(params)
}

export const buildStrapiImage = (image: StrapiMediaImage | undefined) => {
  if (!image?.url) return undefined
  return {
    ...image,
    url: getStrapiImageUrl(image?.url),
    alternativeText: image?.alternativeText || '',
    width: Number(image?.width),
    height: Number(image?.height),
  } satisfies Partial<StrapiMediaImage>
}
