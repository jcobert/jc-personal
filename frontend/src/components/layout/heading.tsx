import { FC } from 'react'

import { cn } from '@/utils/style'

export type HeadingProps = {
  text?: string
  className?: string
  alignment?: 'left' | 'center' | 'right' | 'dynamic'
}

const Heading: FC<HeadingProps> = ({
  text = '',
  className,
  alignment = 'dynamic',
}) => {
  return (
    <h1
      className={cn([
        'text-3xl sm:text-4xl font-semibold text-balance text-brand-primary dark:text-brand-light',
        {
          'text-left': alignment === 'left',
          'text-center': alignment === 'center',
          'text-right': alignment === 'right',
          'text-center md:text-left': alignment === 'dynamic',
        },
        className,
      ])}
    >
      {text}
    </h1>
  )
}

export default Heading
