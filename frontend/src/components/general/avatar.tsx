import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  name?: string
  image?: string
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  textClassName?: string
}

const Avatar: FC<Props> = ({
  name,
  image,
  size = 'md',
  className,
  textClassName,
}) => {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={cn('flex-none rounded-full bg-gray-3 border', [
          size === '2xs' && 'size-8',
          size === 'xs' && 'size-10',
          size === 'sm' && 'size-16',
          size === 'md' && 'size-20',
          size === 'lg' && 'size-24',
          size === 'xl' && 'size-28',
          className,
        ])}
        src={image}
        alt={name}
      />
    )
  }

  if (!name) {
    return (
      <div
        className={cn('flex-none rounded-full bg-gray-3 border', [
          size === '2xs' && 'size-8',
          size === 'xs' && 'size-10',
          size === 'sm' && 'size-16',
          size === 'md' && 'size-20',
          size === 'lg' && 'size-24',
          size === 'xl' && 'size-28',
          className,
        ])}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex-none rounded-full bg-gray-3 border flex justify-center items-center',
        [
          size === '2xs' && 'size-8',
          size === 'xs' && 'size-10',
          size === 'sm' && 'size-16',
          size === 'md' && 'size-20',
          size === 'lg' && 'size-24',
          size === 'xl' && 'size-28',
          className,
        ],
      )}
    >
      <div
        className={cn('text-gray-9', [
          size === '2xs' && 'text-xl',
          size === 'xs' && 'text-3xl',
          size === 'sm' && 'text-4xl',
          size === 'md' && 'text-4xl',
          size === 'lg' && 'text-5xl',
          size === 'xl' && 'text-5xl',
          textClassName,
        ])}
      >
        {(name?.[0] || '')?.toUpperCase()}
      </div>
    </div>
  )
}

export default Avatar
