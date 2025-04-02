import { FC } from 'react'

import { HomePage } from '@/lib/strapi/queries/home-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

type Props = {
  image: HomePage['profilePhoto']
  className?: string
}

const ProfilePhoto: FC<Props> = ({ image, className }) => {
  if (!image?.url) return null

  return (
    <div
      role='img'
      aria-label='josh cobert'
      className={cn(
        'flex-none size-40 mx-auto bg-center bg-cover bg-no-repeat rounded-full shadow-lg border-4 border-gray-5',
        className,
      )}
      style={{
        backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
      }}
    />
  )
}

export default ProfilePhoto
