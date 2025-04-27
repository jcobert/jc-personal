import NextLink from 'next/link'
import { ComponentProps, FC } from 'react'
import { RxBorderSolid } from 'react-icons/rx'
import { TfiLineDotted } from 'react-icons/tfi'

import { isObject } from '@/utils/general'
import { cn } from '@/utils/style'

import { useNavigationMenu } from '@/hooks/use-navigation-menu'

export type NavLinkProps = ComponentProps<typeof NextLink> & {
  /** When `true`, indicators will be shown for active and hovered links, respectively. Default is `false`. */
  withIndicators?: boolean
}

export const navLinkClassName =
  'text-brand-primary text-lg transition block select-none px-3 py-2 font-medium leading-none no-underline data-[active=true]:text-brand-dark hover:text-brand-light rounded [&:not([data-active=true])]:hover:bg-brand-2'

const NavLink: FC<NavLinkProps> = ({
  href = '',
  className,
  children,
  withIndicators = false,
  ...props
}) => {
  const url = (isObject(href) ? href?.href || href?.pathname : href) || ''

  const { isActivePath } = useNavigationMenu()
  const isActive = isActivePath(url)

  return (
    <div className={cn(withIndicators && 'flex flex-col items-center')}>
      <NextLink
        data-active={isActive}
        className={cn(navLinkClassName, 'peer', className)}
        href={url}
        {...props}
      >
        {children}
      </NextLink>
      {withIndicators ? (
        <>
          <TfiLineDotted
            aria-hidden
            className={cn(
              'absolute top-[calc(100%-1.125rem)] text-4xl -z-10',
              'text-brand-extra-light opacity-0 peer-hover:opacity-100',
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
