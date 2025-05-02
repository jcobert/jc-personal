import Link from 'next/link'
import { ComponentPropsWithoutRef, FC } from 'react'

import { homeUrl } from '@/utils/nav'
import { cn } from '@/utils/style'

import Logo from '@/components/general/logo'

type Props = Partial<ComponentPropsWithoutRef<typeof Link>> & {
  className?: string
}

const LogoLink: FC<Props> = ({ className, href, ...props }) => {
  const url = href || homeUrl()
  return (
    <Link href={url} {...props} className={cn('w-fit', className)}>
      <Logo aria-hidden className='hover:text-gray-2 hover:bg-brand-light' />
      <span className='sr-only w-0'>Home</span>
    </Link>
  )
}

export default LogoLink
