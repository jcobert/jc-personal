import { FC } from 'react'

import DesktopNav from '@/components/layout/nav/desktop-nav'
import MobileNav from '@/components/layout/nav/mobile-nav'

import { NAVIGATION_ITEMS } from '@/configuration/nav'

const Header: FC = async () => {
  const navClassName = 'bg-almost-white/90 dark:bg-almost-black/90 transition'

  return (
    <>
      <MobileNav className={navClassName} navItems={NAVIGATION_ITEMS} />
      <DesktopNav className={navClassName} navItems={NAVIGATION_ITEMS} />
    </>
  )
}

export default Header
