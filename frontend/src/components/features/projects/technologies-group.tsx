'use client'

import TechnologyBadge, { TechnologyBadgeProps } from './technology-badge'
import { sortBy } from 'lodash'
import { FC, useState } from 'react'
import { FaAngleUp } from 'react-icons/fa'

import { Technology } from '@/lib/strapi/types/common'

import { cn } from '@/utils/style'

import Button from '@/components/general/button'

type Props = {
  technologies: Technology[]
  limit?: number
  expandable?: boolean
  className?: string
} & Omit<TechnologyBadgeProps, 'className' | 'technology'>

const TechnologiesGroup: FC<Props> = ({
  technologies,
  limit = 3,
  expandable = true,
  className,
  ...badgeProps
}) => {
  const [techExpanded, setTechExpanded] = useState(false)

  const hiddenCount = (technologies || []).length - limit

  if (!technologies?.length) return null

  return (
    <div className={cn('flex gap-x-8 gap-y-2', techExpanded && 'flex-col')}>
      <div
        className={cn('flex flex-wrap justify-around w-full gap-8', className)}
      >
        {sortBy(technologies, (t) => t?.displayName)
          ?.slice(0, !techExpanded ? limit : undefined)
          ?.map((tech) => (
            <TechnologyBadge
              key={tech?.id}
              technology={tech}
              size='sm'
              showText
              {...badgeProps}
            />
          ))}
        {technologies?.length > limit && techExpanded ? (
          <>
            <Button
              aria-label='Hide additional technologies.'
              variant='tertiary'
              className='py-2 px-4 size-fit min-w-0 !min-h-0 self-center text-sm font-medium'
              onClick={() => {
                setTechExpanded((prev) => !prev)
              }}
            >
              <span>Hide</span>
              <FaAngleUp aria-hidden />
            </Button>
            <span aria-hidden className='ml-auto' />
          </>
        ) : null}
      </div>
      {technologies?.length > 3 && !techExpanded ? (
        <>
          {!expandable ? (
            <span className='sr-only'>{`+ ${hiddenCount} more technologies.`}</span>
          ) : null}
          <Button
            aria-hidden={!expandable}
            inert={!expandable}
            aria-label={`+ ${hiddenCount} more technologies. Click to show all.`}
            variant={expandable ? 'secondary' : 'tertiary'}
            className={cn(
              'p-2 size-fit min-w-0 !min-h-0 flex-none self-center text-sm font-medium',
              !expandable && 'p-0'
            )}
            onClick={() => {
              setTechExpanded((prev) => !prev)
            }}
          >
            {`+ ${hiddenCount}`}
          </Button>
        </>
      ) : null}
    </div>
  )
}

export default TechnologiesGroup
