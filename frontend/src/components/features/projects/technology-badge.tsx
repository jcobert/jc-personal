import { Technology } from './types'
import { FC } from 'react'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

type Props = {
  technology: Technology
}

const TechnologyBadge: FC<Props> = ({ technology }) => {
  const { displayName, image } = technology || {}

  return (
    <div className='flex flex-col gap-1 items-center'>
      {/* {image?.url ? (
        <Image
          aria-hidden
          className='size-10'
          src={getStrapiImageUrl(image?.url)}
          alt={image?.alternativeText || ''}
          width={Number(image?.width || 40)}
          height={Number(image?.height || 40)}
        />
      ) : null} */}

      {image?.url ? (
        <div
          className='size-10 bg-cover'
          style={{
            backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
          }}
        />
      ) : null}

      <span>{displayName}</span>
    </div>
  )
}

export default TechnologyBadge
