'use client'

import { useTheme } from 'next-themes'
import { FC } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useIsClient } from 'usehooks-ts'

import { cn } from '@/utils/style'

import Button from '@/components/general/button'

type Props = {
  className?: string
}

const ThemeSelector: FC<Props> = ({ className }) => {
  const isClient = useIsClient()
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'
  const isLight = resolvedTheme === 'light'

  const ActiveIcon = isDark ? MdDarkMode : MdLightMode

  if (!isClient) return null

  return (
    <Button
      data-dark={isDark}
      className={cn(
        'p-2 rounded-full min-w-0 max-sm:w-fit max-sm:min-h-0',
        isLight &&
          'text-gray-10 border-gray-8 hover:text-gray-11 hover:border-gray-9',
        isDark &&
          'bg-indigo-900 text-white hover:text-gray-3 border-white hover:bg-indigo-950 hover:border-gray-2',
        className,
      )}
      variant='secondary'
      onClick={() => {
        if (isLight) {
          setTheme('dark')
        } else setTheme('light')
      }}
    >
      <ActiveIcon
      // className={cn('', isLight && 'text-amber-500', isDark && '')}
      />
    </Button>
  )
}

export default ThemeSelector
