import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

import { StrapiMediaImage as SImg } from '@/lib/strapi/types/general'
import { buildStrapiImage } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

type Props = Partial<ImageProps> & {
  image: SImg | undefined
}

const StrapiMediaImage: FC<Props> = ({ image, ...props }) => {
  const img = buildStrapiImage(image)

  if (!img) return <div className={cn(props?.className)} />

  return (
    <Image
      src={img?.url}
      alt={img?.alternativeText}
      width={img?.width}
      height={img?.height}
      {...props}
    />
  )
}

export default StrapiMediaImage
