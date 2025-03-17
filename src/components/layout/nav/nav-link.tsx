import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import NextLink from 'next/link'
import { FC } from 'react'
import { RxBorderSolid } from 'react-icons/rx'
import { TfiLineDotted } from 'react-icons/tfi'

import { cn } from '@/utils/style'

import { useNavigationMenu } from '@/hooks/use-navigation-menu'

export const navLinkClassName =
  'text-brand-primary transition block select-none px-3 py-2 text-[15px] font-medium leading-none no-underline data-[active]:text-brand-dark hover:bg-brand-2'

const NavLink: FC<NavigationMenu.NavigationMenuLinkProps> = ({
  href = '',
  className,
  ...props
}) => {
  const { isActivePath } = useNavigationMenu()
  const isActive = isActivePath(href)

  return (
    <div className='flex flex-col items-center'>
      <NextLink href={href} passHref legacyBehavior>
        <NavigationMenu.Link
          className={cn(navLinkClassName, 'peer', className)}
          active={isActive}
          {...props}
        />
      </NextLink>
      <TfiLineDotted
        aria-hidden
        className={cn(
          'text-4xl text-brand-extra-light absolute top-[calc(100%-1.125rem)] opacity-0 peer-hover:opacity-100 transition-opacity',
          isActive && 'hidden',
          'peer-hover:animate-slideInFromLeft',
        )}
      />
      <RxBorderSolid
        aria-hidden
        className={cn(
          'hidden absolute top-[calc(100%-0.625rem)] text-lg',
          'text-brand-extra-light',
          isActive && 'inline-block',
          'animate-scaleIn',
        )}
      />
    </div>
  )
}

export default NavLink
