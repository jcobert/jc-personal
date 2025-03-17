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
      <Logo className='hover:text-thm-gray-2 hover:bg-brand-dark' />
    </Link>
  )
}

export default LogoLink
