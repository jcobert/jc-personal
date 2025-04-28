import TechnologiesGroup from './technologies-group'
import { Project } from './types'
import { FC } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

import Link from '@/components/general/link'

type Props = {
  project?: Project
}

const ProjectCard: FC<Props> = ({ project }) => {
  const { title, shortDescription, image, slug, technologies } = project || {}

  const projectLink = `/projects/${slug}`

  if (!project) return null

  return (
    <div className='md:max-w-2xl w-full mx-auto rounded border border-gray-8 shadow flex flex-col'>
      {/* Title */}
      <Link
        href={projectLink}
        className='py-2 text-center border-b border-brand-3 font-semibold text-xl bg-brand-1 text-brand-primary hover:bg-brand-2 rounded-[.1875rem] rounded-b-none shadow-sm'
      >
        {title}
      </Link>
      {/* Body */}
      <div className='flex flex-1 py-6 flex-col gap-y-6 text-left px-8 md:py-8 justify-between'>
        {/* Preview Image */}
        <Link
          aria-hidden
          href={projectLink}
          className={cn(
            'max-w-xs aspect-video bg-cover border border-gray-5 hover:border-brand-6 shadow-sm w-full mx-auto lg:flex-initial bg-no-repeat',
          )}
          style={{
            backgroundImage: `url(${getStrapiImageUrl(image?.url) || '/jc-website-logo.png'})`,
            ...(!image?.url
              ? { backgroundSize: '40%', backgroundPosition: 'center' }
              : {}),
          }}
        />
        {/* Description */}
        <p className='sm:text-lg text-pretty grow'>{shortDescription}</p>
        {/* Technologies */}
        {technologies?.length ? (
          <div className='flex flex-col gap-y-6 mb-4'>
            <h4 className='sr-only'>Technologies</h4>
            <TechnologiesGroup
              technologies={technologies}
              expandable={false}
              showText={false}
            />
          </div>
        ) : null}
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
