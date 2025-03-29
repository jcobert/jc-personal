import { Project } from './types'
import { FC } from 'react'

import RichText from '@/components/general/block-content/rich-text'

type Props = {
  project?: Project
}

const ProjectPost: FC<Props> = ({ project }) => {
  const { title, shortDescription, body } = project || {}

  if (!project) return null

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1>{title}</h1>
        <p>{shortDescription}</p>
      </div>
      <div>
        <RichText content={body} />
      </div>
    </div>
  )
}

export default ProjectPost
