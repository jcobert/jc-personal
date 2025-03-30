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
      {image?.url ? (
        // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
        <img
          aria-hidden
          className='size-10'
          src={getStrapiImageUrl(image?.url)}
        />
      ) : null}
      <span>{displayName}</span>
    </div>
  )
}

export default TechnologyBadge
