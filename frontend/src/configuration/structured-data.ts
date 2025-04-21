import { Person, WebSite, WithContext } from 'schema-dts'

import { canonicalUrl, siteConfig } from '@/configuration/site'

export const personJsonLd = () =>
  ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': canonicalUrl('#josh-cobert'),
    name: 'Josh Cobert',
    familyName: 'Cobert',
    givenName: 'Josh',
    alternateName: 'Joshua Cobert',
    sameAs: ['https://cobezmusic.com/about'],
    parent: {
      '@type': 'Person',
      name: 'Jon Cobert',
      url: 'https://en.wikipedia.org/wiki/Jon_Cobert',
      sameAs: [
        'https://www.cobertoperations.com/',
        'https://en.wikipedia.org/wiki/Jon_Cobert',
      ],
    },
  }) satisfies WithContext<Person>

export const websiteJsonLd = () => {
  const website: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': siteConfig?.url,
    name: siteConfig?.title,
    url: siteConfig?.url,
    publisher: personJsonLd(),
  }

  return website
}
