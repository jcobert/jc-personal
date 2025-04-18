import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

type Props = {
  title?: string
  subtitle?: string
  description?: ReactNode
  actions?: ReactNode
  className?: string
}

const NoResults: FC<Props> = ({
  title = 'No results',
  subtitle = '',
  description,
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 w-full text-center prose text-balance mx-auto',
        className,
      )}
    >
      <div className='flex flex-col items-center gap-1 font-medium'>
        {title ? <span className='text-lg'>{title}</span> : null}
        {subtitle ? <span className='text-xl'>{subtitle}</span> : null}
      </div>

      {typeof description === 'string' ? (
        <p className='text-balance'>{description}</p>
      ) : (
        description
      )}

      {actions ? (
        <div
          className={cn(
            'flex justify-center gap-6',
            !description && 'mt-6',
            description && 'mt-4',
          )}
        >
          {actions}
        </div>
      ) : null}
    </div>
  )
}

export default NoResults
