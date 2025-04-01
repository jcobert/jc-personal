import TechnologyBadge from './technology-badge'
import { Project } from './types'
import { FC } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import Link from '@/components/general/link'

type Props = {
  project?: Project
}

const ProjectCard: FC<Props> = ({ project }) => {
  const { title, shortDescription, image, slug, technologies } = project || {}

  const projectLink = `/projects/${slug}`

  if (!project) return null

  return (
    <div className='md:max-w-2xl mx-auto rounded border border-gray-8 shadow-md flex flex-col justify-between__'>
      {/* Title */}
      <Link
        href={projectLink}
        className='py-2 text-center font-semibold text-xl text-white bg-brand-primary hover:bg-brand-light hover:text-gray-2 rounded-[.1875rem] rounded-b-none shadow-sm'
      >
        {title}
      </Link>
      {/* Body */}
      <div className='flex flex-1 py-6 flex-col gap-y-6 text-left px-8 md:py-8 justify-between'>
        {/* Description */}
        <p className='sm:text-lg text-pretty'>{shortDescription}</p>
        {/* Preview Image */}
        <div
          className='max-w-xs aspect-video bg-cover border border-gray-5 shadow-sm w-full mx-auto lg:flex-initial'
          style={{
            backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
          }}
        />
        {/* Technologies */}
        <div className='flex flex-col gap-y-6 py-4'>
          {/* <h5 className='font-medium text-gray-11 text-center border border-gray-5 border-x-0'>
            Technologies  
          </h5> */}
          <div className='flex flex-wrap justify-around gap-2 w-full max-w-xs mx-auto'>
            {technologies?.map((tech) => (
              <TechnologyBadge key={tech?.id} technology={tech} size='sm' />
            ))}
          </div>
        </div>
        {/* CTA */}
        <Link href={projectLink} variant='secondary' className='mx-auto'>
          <span>Check it out</span>
          <FaAngleRight aria-hidden />
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard
