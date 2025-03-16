export const siteConfig = {
  title: 'Josh Cobert',
  description: 'The man, the myth, the developer.',
  url: process.env.NEXT_PUBLIC_SITE_BASE_URL || '',
} as const

/** Appends the provided pathname to the site's base URL. */
export const canonicalUrl = (path: string) => `${siteConfig?.url}${path}`
