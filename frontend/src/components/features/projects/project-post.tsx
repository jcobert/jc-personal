import TechnologyBadge from './technology-badge'
import { Project } from './types'
import { FC } from 'react'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import RichText from '@/components/general/block-content/rich-text'

type Props = {
  project?: Project | null
}

const ProjectPost: FC<Props> = ({ project }) => {
  const { title, shortDescription, body, image, technologies } = project || {}

  if (!project) return null

  return (
    <div className='flex flex-col gap-12'>
      <div className='grid grid-cols-1 lg:grid-rows-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-5'>
        <div className='flex flex-col gap-y-2 md:gap-y-5 lg:col-span-2 prose'>
          <h1 className='max-sm:text-center'>{title}</h1>
          <p>{shortDescription}</p>
        </div>

        {/* Image */}
        {image?.url ? (
          <div className='lg:col-start-3 lg:col-span-3 lg:row-span-2 w-full'>
            <div
              className='h-60 w-11/12 sm:w-full max-w-xl mx-auto md:h-52 lg:h-72 bg-cover border border-gray-5 shadow-md md:shadow-lg'
              style={{
                backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
              }}
            />
          </div>
        ) : null}

        {/* Technologies */}
        {technologies?.length ? (
          <div className='flex flex-col gap-y-6 md:col-span-2 lg:col-span-2 w-11/12 md:w-10/12 lg:w-11/12 mx-auto'>
            <h5 className='font-medium text-gray-11 text-center border border-gray-5 border-x-0'>
              Technologies
            </h5>
            <div className='flex flex-wrap justify-around gap-8'>
              {technologies?.map((tech) => (
                <TechnologyBadge
                  key={tech?.id}
                  technology={tech}
                  size='sm'
                  showText
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <RichText className='mx-auto' content={body} />
    </div>
  )
}

export default ProjectPost
