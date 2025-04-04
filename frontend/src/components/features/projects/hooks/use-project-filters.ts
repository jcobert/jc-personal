import { Project, Technology } from '../types'
import { sortBy, uniqBy } from 'lodash'
import { useMemo, useState } from 'react'

import { SelectOption } from '@/components/form/inputs/select-input'

export const useProjectFilters = (projects: Project[] | undefined) => {
  const [filterValue, setFilterValue] = useState<Technology>()

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

  return { filterOptions, filteredProjects, filterValue, setFilterValue }
}
