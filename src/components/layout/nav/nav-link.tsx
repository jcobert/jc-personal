import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import NextLink from 'next/link'
import { FC } from 'react'
import { RxBorderSolid } from 'react-icons/rx'
import { TfiLineDotted } from 'react-icons/tfi'

import { cn } from '@/utils/style'

import { useNavigationMenu } from '@/hooks/use-navigation-menu'

export type NavLinkProps = NavigationMenu.NavigationMenuLinkProps & {
  /** When `true`, indicators will be shown for active and hovered links, respectively. Default is `false`. */
  withIndicators?: boolean
}

export const navLinkClassName =
  'text-brand-primary text-lg transition block select-none px-3 py-2 font-medium leading-none no-underline data-[active]:text-brand-dark hover:text-brand-light rounded [&:not([data-active])]:hover:bg-brand-2 data-[active]:bg-brand-1__'

const NavLink: FC<NavLinkProps> = ({
  href = '',
  className,
  withIndicators = false,
  ...props
}) => {
  const { isActivePath } = useNavigationMenu()
  const isActive = isActivePath(href)

  return (
    <div className={cn(withIndicators && 'flex flex-col items-center')}>
      <NextLink href={href} passHref legacyBehavior>
        <NavigationMenu.Link
          className={cn(navLinkClassName, 'peer', className)}
          active={isActive}
          {...props}
        />
      </NextLink>
      {withIndicators ? (
        <>
          <TfiLineDotted
            aria-hidden
            className={cn(
              'absolute top-[calc(100%-1.125rem)] text-4xl -z-10',
              'text-brand-extra-light opacity-0 peer-hover:opacity-100 transition-opacity',
              isActive && 'hidden',
              'peer-hover:animate-slideInFromLeft',
            )}
          />
          <RxBorderSolid
            aria-hidden
            className={cn(
              'hidden absolute top-[calc(100%-0.5rem)] text-lg -z-10',
              'text-brand-primary',
              isActive && 'inline-block',
              'animate-scaleIn',
            )}
          />
        </>
      ) : null}
    </div>
  )
}

export default NavLink
