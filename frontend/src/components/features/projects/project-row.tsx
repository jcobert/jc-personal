import TechnologiesGroup from './technologies-group'
import { Project } from './types'
import { FC } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

import Link from '@/components/general/link'

type Props = {
  project: Project | undefined
}

const ProjectRow: FC<Props> = ({ project }) => {
  const { title, shortDescription, image, slug, technologies } = project || {}

  const projectLink = `/projects/${slug}`

  if (!project) return null

  return (
    <Link
      href={projectLink}
      className={cn(
        'group hover:shadow transition w-full flex max-sm:flex-col gap-x-8 sm:items-center gap-y-4 hover:bg-brand-1 p-4 border hover:border-brand-7 rounded',
      )}
    >
      <div className='max-sm:w-full w-36 flex-none'>
        <div
          aria-hidden
          className='max-w-36 h-32 bg-cover bg-no-repeat border group-hover:border-brand-6 shadow-sm w-full mx-auto lg:flex-initial'
          style={{
            backgroundImage: `url(${getStrapiImageUrl(image?.url) || '/jc-website-logo.png'})`,
            ...(!image?.url
              ? { backgroundSize: '50%', backgroundPosition: 'center' }
              : {}),
          }}
        />
      </div>

      <div className='flex flex-col gap-2 max-sm:items-center'>
        <h2 className='text-balance text-brand-primary max-w-prose text-xl max-sm:text-center font-medium group-hover:text-brand-dark transition'>
          {title}
        </h2>
        <p className='sm:text-lg text-pretty'>{shortDescription}</p>

        {technologies?.length ? (
          <div className='mt-2'>
            <TechnologiesGroup
              className='gap-y-4 justify-start w-fit'
              technologies={technologies}
              size='xs'
              showText={false}
              expandable={false}
              limit={4}
            />
          </div>
        ) : null}
      </div>

      <FaAngleRight
        aria-hidden
        className='text-brand-primary ml-auto mr-2 lg:mr-5 xl:mr-8 flex-none group-hover:scale-125 transition-transform'
      />
    </Link>
  )
}

export default ProjectRow
