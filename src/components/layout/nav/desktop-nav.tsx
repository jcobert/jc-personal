'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { FC, ReactNode } from 'react'

import { NavItem } from '@/utils/nav'
import { cn } from '@/utils/style'

import LogoLink from '@/components/layout/nav/logo-link'
import NavLink from '@/components/layout/nav/nav-link'
import NavMenuDropdown from '@/components/layout/nav/nav-menu-dropdown'

import { useNavigationMenu } from '@/hooks/use-navigation-menu'

type Props = {
  navItems: NavItem[]
  className?: string
  children?: ReactNode
}

const DesktopNav: FC<Props> = ({ navItems, className, children }) => {
  const { isActive } = useNavigationMenu()

  return (
    <div
      id='desktop-navbar'
      className={cn([
        'hidden z-50 md:block w-full border-b border-gray-4 dark:border-gray-10 shadow-sm py-2 sticky top-0 background-saturate-150 backdrop-blur-lg',
        className,
      ])}
    >
      <div className='sm:flex items-center gap-6 layout px-2 sm:px-0'>
        <LogoLink />

        <NavigationMenu.Root className='z-[1] flex justify-center min-h-[42px] ml-auto'>
          <NavigationMenu.List
            className={cn('m-0 flex gap-2 list-none rounded-[6px] p-1')}
          >
            {navItems?.map((item, i) => {
              const hasMenu = !!item?.menu?.links?.length
              return (
                <NavigationMenu.Item
                  key={item?.id}
                  className={cn(
                    'group/navitem mt-px border-transparent transition',
                    i > 0 && 'pl-2',
                  )}
                >
                  {!hasMenu ? (
                    <NavLink
                      href={item?.url}
                      className={cn(
                        isActive(item) && 'font-semibold !text-brand-dark',
                        'min-w-[5.5rem] text-center',
                      )}
                      withIndicators
                    >
                      {item?.name}
                    </NavLink>
                  ) : (
                    <NavMenuDropdown item={item} />
                  )}
                </NavigationMenu.Item>
              )
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>
        {children}
      </div>
    </div>
  )
}

export default DesktopNav
