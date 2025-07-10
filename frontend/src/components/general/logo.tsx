import { FC, HTMLProps } from 'react'

import { cn } from '@/utils/style'

type Props = HTMLProps<HTMLDivElement>

const Logo: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'border-2 flex items-center justify-center bg-white border-gray-6 hover:border-gray-5 text-brand-primary transition rounded-full size-10 pl-0.5',
        className,
      )}
      {...props}
    >
      <span className='font-heading text-center text-2xl'>JC</span>
    </div>
  )
}

export default Logo
