import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  className?: string
}

const Logo: FC<Props> = ({ className }) => {
  return (
    <div
      aria-label='Josh Cobert monogram logo'
      className={cn(
        'border-2 flex items-center justify-center bg-white border-gray-6 hover:border-gray-5 text-brand-primary transition rounded-full size-10 pl-0.5',
        className,
      )}
    >
      <span className='font-heading text-center text-2xl'>JC</span>
    </div>
  )
}

export default Logo
