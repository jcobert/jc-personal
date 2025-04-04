'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { RxHamburgerMenu } from 'react-icons/rx'

import { NavItem, isActive } from '@/utils/nav'
import { cn } from '@/utils/style'

import Accordion from '@/components/layout/accordion'
import Drawer from '@/components/layout/drawer'
import LogoLink from '@/components/layout/nav/logo-link'

import { useNavigationMenu } from '@/hooks/use-navigation-menu'

type Props = {
  navItems: NavItem[]
  className?: string
}

const MobileNav: FC<Props> = ({ navItems, className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const { isActive: isActiveMenu } = useNavigationMenu()

  return (
    <div
      id='mobile-navigation'
      data-open={isMenuOpen}
      className={cn([
        'md:hidden',
        'border-b border-gray-4 shadow-sm sticky top-0 bg-white/50 backdrop-blur-lg',
        className,
      ])}
    >
      <div
        className={cn(
          'w-full p-4 py-2 flex items-center',
          // 'z-[51]',
          isMenuOpen && 'invisible',
        )}
      >
        {/* Logo */}
        <LogoLink className='relative left-[calc(50%-1rem)]' />

        {/* Hamburger */}
        <button
          className='w-fit ml-auto'
          onClick={() => {
            setIsMenuOpen((prev) => !prev)
          }}
        >
          <RxHamburgerMenu className='text-3xl' />
        </button>
      </div>

      {/* Menu */}
      <Drawer
        open={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        overlay={false}
        closeButton={false}
      >
        <div
          className={cn(
            'w-full p-4 flex items-center',
            'border-b border-gray-4 shadow-sm py-2 sticky top-0 bg-white/50 backdrop-blur-lg',
          )}
        >
          {/* Logo */}
          <LogoLink
            className='relative left-[calc(50%-1rem)]'
            onClickCapture={() => {
              setIsMenuOpen(false)
            }}
          />
          {/* Hamburger */}
          <button
            className='w-fit ml-auto'
            onClick={() => {
              setIsMenuOpen((prev) => !prev)
            }}
          >
            <CgClose className='text-3xl rounded' />
          </button>
        </div>

        <div className='px-8 pt-4 overflow-y-auto pb-16 h-dvh flex flex-col'>
          {/* Links */}
          <div className='flex flex-col gap-6 mt-6 pb-safe flex-1'>
            {navItems?.map((item, i) => {
              const hasMenu = !!item?.menu?.links?.length
              const isLast = i === navItems.length - 1
              return (
                <div
                  key={item?.id}
                  className={cn([
                    'text-right text-xl border-gray-10/15 pb-2 flex justify-end text-gray-11',
                    isActive(item, pathname) && 'text-brand-dark',
                    !isLast && 'border-b',
                  ])}
                >
                  {!hasMenu ? (
                    <Link
                      className='w-full font-semibold py-2'
                      href={item?.url}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item?.name}
                    </Link>
                  ) : (
                    <Accordion
                      collapsible
                      className='border-none pr-0 w-full rounded-none'
                      triggerClassName={cn([
                        '!justify-end rounded-none font-semibold text-xl text-gray-11 data-[state=open]:font-bold hover:bg-background bg-background p-0',
                        isActiveMenu(item) && 'text-brand-dark',
                      ])}
                      itemClassName='!p-0 -mr-2'
                      contentClassName='bg-gray-11/5'
                      items={[
                        {
                          header: item?.name,
                          content: (
                            <div className='flex flex-col gap-6 py-4 rounded'>
                              {!!item?.url && (
                                <Link
                                  key={`${item?.id}-menu`}
                                  className='w-full font-medium text-gray-11 pr-8 py-2'
                                  href={item?.url}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {`All ${item?.name}`}
                                </Link>
                              )}
                              {item?.menu?.links?.map((link) => (
                                <Link
                                  key={link?.id}
                                  className='w-full font-medium text-gray-11 pr-8 py-2'
                                  href={link?.url}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {link?.name}
                                </Link>
                              ))}
                            </div>
                          ),
                        },
                      ]}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default MobileNav
