import NextLink from 'next/link'
import { ComponentPropsWithoutRef, FC } from 'react'

import { cn } from '@/utils/style'

import {
  AdditionalButtonProps,
  buttonColorClassNames,
  buttonVariantClassNames,
} from '@/components/general/button'

export type LinkProps = {
  //
} & ComponentPropsWithoutRef<typeof NextLink> &
  Pick<AdditionalButtonProps, 'variant' | 'color'>

const Link: FC<LinkProps> = ({
  children,
  className,
  variant,
  color = 'brand',
  ...props
}) => {
  const variantStyle = variant ? buttonVariantClassNames?.[variant] : ''

  const emphasisStyle = color
    ? buttonColorClassNames?.[color]?.[variant || 'primary'] || ''
    : ''

  return (
    <NextLink
      {...props}
      className={cn([variantStyle, emphasisStyle, 'no-underline', className])}
    >
      {children}
    </NextLink>
  )
}

export default Link
