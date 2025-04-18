import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

type Props = {
  children?: ReactNode
  className?: string
}

const Tag: FC<Props> = ({ children, className }) => {
  if (!children) return null
  return (
    <span
      className={cn([
        'rounded-md px-2 py-1 max-sm:px-4 size-fit border text-sm bg-gray-3 text-center capitalize font-medium whitespace-nowrap',
        className,
      ])}
    >
      {children}
    </span>
  )
}

export default Tag
