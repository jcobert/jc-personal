'use client'

import { useProjectsToolbar } from './hooks/use-projects-toolbar'
import ProjectCard from './project-card'
import ProjectRow from './project-row'
import ProjectsToolbar from './projects-toolbar'
import { Project } from './types'
import { FC } from 'react'

import { cn } from '@/utils/style'

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
  const filters = useProjectsToolbar(projects)
  const { filteredProjects, layout } = filters

  if (!projects?.length) return null

  return (
    <div className='flex flex-col gap-6'>
      <ProjectsToolbar filters={filters} />

      {layout === 'list' ? (
        <>
          <ProjectList projects={filteredProjects} className='max-sm:hidden' />
          <ProjectGrid projects={filteredProjects} className='sm:hidden' />
        </>
      ) : (
        <ProjectGrid projects={filteredProjects} />
      )}
    </div>
  )
}

export default ProjectCollection
