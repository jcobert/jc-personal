'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { FC } from 'react'
import { FaAngleUp } from 'react-icons/fa6'

import { NavItem } from '@/utils/nav'
import { cn } from '@/utils/style'

import NavLink, { navLinkClassName } from '@/components/layout/nav/nav-link'

import { useNavigationMenu } from '@/hooks/use-navigation-menu'

type Props = {
  item: NavItem
  className?: string
}

const NavMenuDropdown: FC<Props> = ({ item, className }) => {
  const { isActive } = useNavigationMenu()

  if (!item) return null

  return (
    <>
      <NavigationMenu.Trigger
        className={cn(
          navLinkClassName,
          'text-brand-primary hover:border-y-brand-1 group flex select-none items-center justify-between gap-px rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none',
          'min-w-[6.5rem] text-center',
          className,
        )}
      >
        <span
          className={cn(
            isActive(item) &&
              'font-bold text-brand-dark group-hover:text-white transition-colors',
            'min-w-16 text-center',
          )}
        >
          {item?.name}
        </span>
        <FaAngleUp
          className={cn(
            'text-xs group-data-[state=open]:rotate-180 transition-all duration-200',
          )}
        />
      </NavigationMenu.Trigger>

      <div className='perspective-[2000px] absolute top-full flex justify-center w-[var(--radix-navigation-menu-viewport-width)]'>
        <NavigationMenu.Content className='relative mt-4 data-[state=open]:animate-scaleIn shadow-xl data-[state=closed]:animate-scaleOut h-[var(--radix-navigation-menu-viewport-height)] origin-[top_center] overflow-auto rounded-[6px] bg-white transition-[width,_height] duration-300 w-[var(--radix-navigation-menu-viewport-width)] max-h-[70dvh]'>
          {/* Menu title */}
          <p className='text-xl -mb-1 px-[22px] mt-[10px] text-dark-gray'>
            {item?.name}
          </p>
          {/* Links */}
          <ul className='m-0 grid list-none gap-x-[10px] gap-y-2 pt-4 p-[22px] grid-cols-[0.75fr_1fr]__'>
            {/* Menu Image */}
            {!!item?.menu?.img?.src && (
              <>
                {item?.url ? (
                  <NavLink
                    href={item?.url}
                    className={cn([
                      'object-cover object-center rounded min-[840px]:min-w-48 group',
                      item?.menu?.links?.length <= 3 && 'row-span-3',
                      item?.menu?.links?.length === 4 && 'row-span-4',
                      item?.menu?.links?.length === 5 && 'row-span-5',
                      item?.menu?.links?.length === 6 && 'row-span-6',
                      item?.menu?.links?.length === 7 && 'row-span-7',
                      item?.menu?.links?.length >= 8 && 'row-span-8',
                    ])}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                    <img
                      className={cn([
                        'object-cover object-center h-full w-full min-w-36 rounded',
                      ])}
                      {...item?.menu?.img}
                    />
                    <div className='text-gray-5 text-center flex flex-col relative -top-full opacity-0 group-hover:opacity-100 h-full rounded transition-opacity bg-black/70 justify-center font-medium'>
                      <span>View All</span>
                      <span>{item?.name}</span>
                    </div>
                  </NavLink>
                ) : (
                  <div
                    className={cn([
                      'object-cover object-center rounded min-[840px]:min-w-48 group',
                      item?.menu?.links?.length <= 3 && 'row-span-3',
                      item?.menu?.links?.length === 4 && 'row-span-4',
                      item?.menu?.links?.length === 5 && 'row-span-5',
                      item?.menu?.links?.length === 6 && 'row-span-6',
                      item?.menu?.links?.length === 7 && 'row-span-7',
                      item?.menu?.links?.length >= 8 && 'row-span-8',
                    ])}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                    <img
                      className={cn([
                        'object-cover object-center h-full w-full min-w-36 rounded',
                      ])}
                      {...item?.menu?.img}
                    />
                  </div>
                )}
              </>
            )}

            {item?.menu?.links?.map((subItem) => (
              <NavigationMenu.Item key={`${item?.id}.${subItem?.id}`}>
                <NavLink
                  href={subItem?.url}
                  className='text-dark-gray h-full transition hover:bg-brand-1 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline group/submenuitem'
                >
                  <div className='flex flex-col gap-2'>
                    <span
                      className={cn([
                        'text-nowrap whitespace-nowrap font-semibold',
                        !subItem?.description && 'min-[840px]:min-w-48',
                      ])}
                    >
                      {subItem?.name}
                    </span>
                    {!!subItem?.description && (
                      <p
                        className={cn(
                          'font-normal text-medium-gray text-pretty md:min-w-72 transition',
                          !isActive(subItem) &&
                            'group-hover/submenuitem:text-white',
                        )}
                      >
                        {subItem?.description}
                      </p>
                    )}
                  </div>
                </NavLink>
              </NavigationMenu.Item>
            ))}
          </ul>
        </NavigationMenu.Content>
      </div>
    </>
  )
}

export default NavMenuDropdown
