import { Technology } from './types'
import { FC } from 'react'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

type Props = {
  technology: Technology
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const TechnologyBadge: FC<Props> = ({
  technology,
  showText = false,
  size = 'md',
}) => {
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
          className={cn('bg-cover size-10', {
            'size-8': size === 'sm',
            'size-10': size === 'md',
            'size-12': size === 'lg',
          })}
          style={{
            backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
          }}
        />
      ) : null}

      {showText ? (
        <span
          className={cn({
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
          })}
        >
          {displayName}
        </span>
      ) : null}
    </div>
  )
}

export default TechnologyBadge
