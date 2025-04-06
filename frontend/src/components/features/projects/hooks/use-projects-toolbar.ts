import { Project } from '../types'
import { sortBy, uniqBy } from 'lodash'
import { useMemo, useState } from 'react'

import { Technology } from '@/lib/strapi/types/common'

import { SelectOption } from '@/components/form/inputs/select-input'
import { LayoutType } from '@/components/general/layout-toggle'

export const useProjectsToolbar = (projects: Project[] | undefined) => {
  const [filterValue, setFilterValue] = useState<Technology>()
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [layout, setLayout] = useState<LayoutType>('list')

  const filterOptions = useMemo(() => {
    const techs = uniqBy(
      (projects || [])?.flatMap((proj) => proj?.technologies),
      (tech) => tech?.documentId,
    )?.filter(Boolean)

    if (!techs?.length) return []
    return sortBy(
      techs?.map(
        (t) =>
          ({
            label: t?.displayName,
            value: t,
          }) satisfies SelectOption<Technology>,
      ),
      (t) => t?.value?.displayName,
    )
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (!filterValue) return projects
    return (
      projects?.filter((p) =>
        (p?.technologies || [])?.some(
          (t) => t?.documentId === filterValue?.documentId,
        ),
      ) || []
    )
  }, [projects, filterValue])

  return {
    filterOptions,
    filteredProjects,
    filterValue,
    setFilterValue,
    filterMenuOpen,
    setFilterMenuOpen,
    layout,
    setLayout,
  }
}

export type UseProjectsToolbarReturn = ReturnType<typeof useProjectsToolbar>
