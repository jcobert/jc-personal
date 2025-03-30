import { Technology } from './types'
import { FC } from 'react'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

// export const technologyIcons = {
//   gatsby: GatsbyIcon,
// }

type Props = {
  technology: Technology
}

const TechnologyBadge: FC<Props> = ({ technology }) => {
  const { displayName, icon } = technology || {}

  return (
    <div className='flex flex-col gap-1 items-center'>
      {icon?.url ? (
        // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
        <img className='size-10' src={getStrapiImageUrl(icon?.url)} />
      ) : null}
      <span>{displayName}</span>
    </div>
  )
}

export default TechnologyBadge
