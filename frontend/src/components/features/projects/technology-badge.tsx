import { FC } from 'react'

import { Technology } from '@/lib/strapi/types/common'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

import Tooltip from '@/components/layout/tooltip'

export type TechnologyBadgeProps = {
  technology: Technology | undefined
  showText?: boolean
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg'
  tooltip?: boolean
  className?: string
}

const BadgeIcon: FC<TechnologyBadgeProps> = ({
  technology,
  showText,
  size,
}) => {
  const { image } = technology || {}
  if (!image) return null
  return (
    <div
      // aria-label={displayName}
      aria-hidden={showText}
      className={cn([
        'bg-cover size-10 cursor-auto',
        size === '2xs' && 'size-4',
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

const TechnologyBadge: FC<TechnologyBadgeProps> = (props) => {
  const { technology, showText = false, size = 'md', tooltip = true } = props
  const { displayName, image } = technology || {}

  if (!technology) return null

  if (!showText) {
    return tooltip ? (
      <>
        <span className='sr-only'>{displayName}</span>
        <Tooltip
          content={displayName}
          trigger={<BadgeIcon {...props} />}
          triggerProps={{ 'aria-hidden': true }}
        />
      </>
    ) : (
      <BadgeIcon {...props} />
    )
  }

  return (
    <div className='flex flex-col gap-1 items-center'>
      {image?.url ? <BadgeIcon {...props} /> : null}

      <span
        className={cn([
          'font-medium',
          size === '2xs' && 'text-2xs',
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
