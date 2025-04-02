import Link, { LinkProps } from './link'
import React, { FC } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

import { cn } from '@/utils/style'

type Props = {
  text?: string
  className?: string
} & LinkProps

const Back: FC<Props> = ({ text = '', className = '', ...props }) => {
  return (
    <Link
      className={cn(
        'flex items-center gap-1 w-fit group font-medium self-start print:hidden',
        className,
      )}
      {...props}
    >
      <IoIosArrowBack
        aria-label='back arrow'
        className='group-hover:text-gray-11 transition'
      />
      <span className='group-hover:text-gray-11 transition'>{text}</span>
    </Link>
  )
}

export default Back
