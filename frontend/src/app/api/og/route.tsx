/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

import { siteConfig } from '@/configuration/site'

export const runtime = 'edge'

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request?.url)

    // Base logo image
    const logoData = (await fetch(
      new URL(
        `${process.env.NEXT_PUBLIC_SITE_BASE_URL}/jc-website-logo.png`,
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer())) as string

    // Dynamic data
    const title = searchParams?.get('title')?.slice(0, 100) || ''
    const subtitle = searchParams?.get('subtitle')?.slice(0, 100) || ''
    const imgUrl = searchParams?.get('url') || ''
    const imgAlt = searchParams?.get('alt') || ''
    const imgWidth = searchParams?.get('width') || ''
    const imgHeight = searchParams?.get('height') || ''

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#FDFDFF',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          {/* Dynamic image */}
          {imgUrl ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
              }}
            >
              <img
                alt={imgAlt}
                width={imgWidth}
                height={imgHeight}
                src={imgUrl}
                style={{
                  backgroundSize: 'contain',
                }}
              />
            </div>
          ) : null}

          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              alt={siteConfig?.title}
              src={logoData}
              style={{ width: '20%' }}
            />
          </div>

          <div
            style={{
              padding: '24px 0 0 0',
              fontSize: '42px',
              color: '#484d92',
            }}
          >
            joshcobert.com
          </div>

          <div
            style={{
              height: '1px',
              width: '20%',
              border: '2px solid rgb(130, 135, 151, 0.65)',
              borderRadius: '4px',
              marginTop: '36px',
            }}
          />

          {/* Title */}
          {title ? (
            <div
              style={{
                fontSize: 80,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                marginTop: 24,
                padding: '0 120px',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
                backgroundImage:
                  'linear-gradient(to bottom right, #484d92, #3a3e81)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {title}
            </div>
          ) : null}
          {subtitle ? <div>{subtitle}</div> : null}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
