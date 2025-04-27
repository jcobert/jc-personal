import { Metadata } from 'next'
import { Flamenco, Quicksand } from 'next/font/google'
import { ReactNode } from 'react'

import { cn } from '@/utils/style'

import ProgressProvider from '@/providers/progress-provider'
import QueryProvider from '@/providers/query-provider'
import ThemeProvider from '@/providers/theme-provider'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
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
  appleWebApp: { title: siteConfig.title },
}

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-quicksand-sans',
})
const flamenco = Flamenco({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-flamenco-serif',
})

const fontVars = cn([quicksand.variable, flamenco.variable])

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className={fontVars}>
      <body>
        <QueryProvider>
          <ThemeProvider>
            <ProgressProvider>
              <ToasterOven />
              <div className='flex flex-col h-full min-h-dvh'>
                <Header />
                <div className='grow'>{children}</div>
                <Footer />
              </div>
            </ProgressProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
