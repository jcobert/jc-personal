import { FC } from 'react'
import { CgMenu, CgMenuGridO } from 'react-icons/cg'

import { cn } from '@/utils/style'

export type LayoutType = 'list' | 'grid'

type Props = {
  layout: LayoutType
  setLayout: (layout: LayoutType) => void
  className?: string
}

const LayoutToggle: FC<Props> = ({ layout, setLayout, className }) => {
  return (
    <div
      className={cn(
        'flex text-gray-11 items-center gap-2 rounded text-xl w-fit',
        className,
      )}
    >
      <button
        type='button'
        className={cn([
          'border border-gray-5 p-2 rounded bg-white hover:bg-gray-2 transition',
          layout === 'list' && 'text-brand-primary border-brand-light',
        ])}
        aria-label='view items as list.'
        onClick={() => setLayout('list')}
      >
        <CgMenu />
      </button>
      <button
        type='button'
        className={cn([
          'border border-gray-5 p-2 rounded bg-white hover:bg-gray-2 transition',
          layout === 'grid' && 'text-brand-primary border-brand-light',
        ])}
        aria-label='view items as grid.'
        onClick={() => setLayout('grid')}
      >
        <CgMenuGridO />
      </button>
    </div>
  )
}

export default LayoutToggle
