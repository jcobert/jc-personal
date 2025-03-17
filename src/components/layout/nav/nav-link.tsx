import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import NextLink from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

import { useNavigationMenu } from '@/hooks/use-navigation-menu'

export const navLinkClassName =
  'text-brand transition [&:not([data-active])]:hover:bg-brand-light hover:text-almost-white data-[active]:hover:text-brand-light block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline data-[active]:text-brand-dark'

const NavLink: FC<NavigationMenu.NavigationMenuLinkProps> = ({
  href = '',
  className,
  ...props
}) => {
  const { isActivePath } = useNavigationMenu()

  return (
    <NextLink href={href} passHref legacyBehavior>
      <NavigationMenu.Link
        className={cn(navLinkClassName, className)}
        active={isActivePath(href)}
        {...props}
      />
    </NextLink>
  )
}

export default NavLink
