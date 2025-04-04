import { Technology } from './types'
import { FC } from 'react'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

import Tooltip from '@/components/layout/tooltip'

type Props = {
  technology: Technology
  showText?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  tooltip?: boolean
}

const BadgeIcon: FC<Props> = ({ technology, showText, size }) => {
  const { image } = technology || {}
  if (!image) return null
  return (
    <div
      // aria-label={displayName}
      aria-hidden={showText}
      className={cn([
        'bg-cover size-10 cursor-auto',
        size === 'xs' && 'size-6',
        size === 'sm' && 'size-8',
        size === 'md' && 'size-10',
        size === 'lg' && 'size-12',
      ])}
      style={{
        backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
      }}
    />
  )
}

const TechnologyBadge: FC<Props> = (props) => {
  const { technology, showText = false, size = 'md' } = props
  const { displayName, image } = technology || {}

  return !showText ? (
    <Tooltip content={displayName} trigger={<BadgeIcon {...props} />} />
  ) : (
    <div className='flex flex-col gap-1 items-center'>
      {image?.url ? <BadgeIcon {...props} /> : null}

      <span
        className={cn([
          size === 'xs' && 'text-xs',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg',
        ])}
      >
        {displayName}
      </span>
    </div>
  )
}

export default TechnologyBadge
