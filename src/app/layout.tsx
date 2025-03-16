import { Metadata } from 'next'
import { ReactNode } from 'react'

import ProgressProvider from '@/providers/progress-provider'
import QueryProvider from '@/providers/query-provider'
import ThemeProvider from '@/providers/theme-provider'

import ToasterOven from '@/components/toast/toast-container'

import { baseOpenGraph, baseTwitter } from '@/configuration/seo'
import { siteConfig } from '@/configuration/site'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-icon.png',
  // },
  openGraph: { ...baseOpenGraph },
  twitter: { ...baseTwitter },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider>
            <ProgressProvider />
            <ToasterOven />
            <div className='flex flex-col h-0 min-h-dvh'>
              {/** @todo Header here */}
              <div className='grow h-full'>{children}</div>
              {/** @todo Footer here */}
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
