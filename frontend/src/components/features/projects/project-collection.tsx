'use client'

import ProjectCard from './project-card'
import ProjectRow from './project-row'
import { Project } from './types'
import { FC, useState } from 'react'

import { cn } from '@/utils/style'

import LayoutToggle, { LayoutType } from '@/components/general/layout-toggle'

type Props = {
  projects: Project[] | undefined
  className?: string
}

const ProjectGrid: FC<Props> = ({ projects, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12',
        className,
      )}
    >
      {projects?.map((proj) => <ProjectCard key={proj?.id} project={proj} />)}
    </div>
  )
}

const ProjectList: FC<Props> = ({ projects, className }) => {
  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {projects?.map((proj) => <ProjectRow key={proj?.id} project={proj} />)}
    </div>
  )
}

const ProjectCollection: FC<Props> = ({ projects }) => {
  const [layout, setLayout] = useState<LayoutType>('list')

  if (!projects?.length) return null

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col items-end justify-end gap-2 max-sm:hidden'>
        <LayoutToggle layout={layout} setLayout={setLayout} />
      </div>

      {layout === 'list' ? (
        <>
          <ProjectList projects={projects} className='max-sm:hidden' />
          <ProjectGrid projects={projects} className='sm:hidden' />
        </>
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </div>
  )
}

export default ProjectCollection
