import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  className?: string
}

const Divider: FC<Props> = ({ className }) => {
  return (
    <div
      aria-hidden
      className={cn(
        'h-px bg-gradient-to-r from-transparent via-brand-6 w-1/2 mx-auto',
        className,
      )}
    />
  )
}

export default Divider
