import { StrapiAPIResponse, StrapiMediaImage } from '@/lib/strapi/types/general'

export type Technology = Omit<
  StrapiAPIResponse<'api::technology.technology'>['data'][number],
  'image'
> & {
  image?: StrapiMediaImage
}

export type StrapiOpenGraph = {
  ogDescription?: string
  ogImage?: StrapiMediaImage
  ogTitle?: string
  ogType?: string
  ogUrl?: string
}

export type StrapiSeo = {
  canonicalURL?: string
  keywords?: string
  metaDescription?: string
  metaImage?: StrapiMediaImage
  metaRobots?: string
  metaTitle?: string
  metaViewport?: string
  openGraph?: StrapiOpenGraph
  structuredData?: string
}

export type WithSeo<T extends Record<string, unknown>> = Omit<T, 'seo'> & {
  seo?: StrapiSeo
}
