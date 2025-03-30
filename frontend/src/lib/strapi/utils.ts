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
