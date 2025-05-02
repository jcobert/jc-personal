'use client'

import TechnologyBadge, { TechnologyBadgeProps } from './technology-badge'
import { sortBy } from 'lodash'
import { FC, useEffect, useRef, useState } from 'react'
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
  const [expanded, setExpanded] = useState<boolean | null>(null)

  const expandButtonRef = useRef<HTMLButtonElement>(null)
  const collapseButtonRef = useRef<HTMLButtonElement>(null)

  const hiddenCount = (technologies || []).length - limit

  // Handles expand toggle focus.
  useEffect(() => {
    if (expanded) {
      collapseButtonRef?.current?.focus()
    } else if (expanded !== null) {
      expandButtonRef?.current?.focus()
    }
  }, [expanded])

  if (!technologies?.length) return null

  return (
    <div className={cn('flex gap-x-8 gap-y-2', expanded && 'flex-col')}>
      <div
        className={cn('flex flex-wrap justify-around w-full gap-8', className)}
      >
        <ul
          className={cn(
            'flex flex-wrap justify-around w-full gap-8',
            className,
          )}
        >
          {sortBy(technologies, (t) => t?.displayName)
            ?.slice(0, !expanded ? limit : undefined)
            ?.map((tech) => (
              <li key={tech?.id} className='leading-none'>
                <TechnologyBadge
                  technology={tech}
                  size='sm'
                  showText
                  {...badgeProps}
                />
              </li>
            ))}
        </ul>
        {technologies?.length > limit && expanded ? (
          <>
            <Button
              ref={collapseButtonRef}
              aria-label='Hide additional technologies.'
              variant='tertiary'
              className='py-2 px-4 size-fit min-w-0 !min-h-0 self-center text-sm font-medium'
              onClick={() => {
                setExpanded(false)
              }}
            >
              <span>Hide</span>
              <FaAngleUp aria-hidden />
            </Button>
            <span aria-hidden className='ml-auto' />
          </>
        ) : null}
      </div>
      {technologies?.length > limit && !expanded ? (
        <>
          {!expandable ? (
            <span className='sr-only'>{`+ ${hiddenCount} more technologies.`}</span>
          ) : null}
          <Button
            ref={expandButtonRef}
            aria-hidden={!expandable}
            inert={!expandable}
            aria-label={`+ ${hiddenCount} more technologies. Click to show all.`}
            variant={expandable ? 'secondary' : 'tertiary'}
            className={cn(
              'p-2 size-fit min-w-0 !min-h-0 flex-none self-center text-sm font-medium',
              !expandable && 'p-0',
            )}
            onClick={() => {
              setExpanded(true)
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
