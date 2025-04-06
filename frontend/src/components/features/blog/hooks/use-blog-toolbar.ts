import { Post } from '../types'
import { sortBy, uniqBy } from 'lodash'
import { useMemo, useState } from 'react'

import { Technology } from '@/lib/strapi/types/common'

import { SelectOption } from '@/components/form/inputs/select-input'
import { LayoutType } from '@/components/general/layout-toggle'

export const useBlogToolbar = (posts: Post[] | undefined) => {
  const [filterValue, setFilterValue] = useState<Technology>()
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [layout, setLayout] = useState<LayoutType>('list')

  const filterOptions = useMemo(() => {
    const techs = uniqBy(
      (posts || [])?.flatMap((p) => p?.technologies),
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
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (!filterValue) return posts
    return (
      posts?.filter((p) =>
        (p?.technologies || [])?.some(
          (t) => t?.documentId === filterValue?.documentId,
        ),
      ) || []
    )
  }, [posts, filterValue])

  return {
    filterOptions,
    filteredPosts,
    filterValue,
    setFilterValue,
    filterMenuOpen,
    setFilterMenuOpen,
    layout,
    setLayout,
  }
}

export type UseBlogToolbarReturn = ReturnType<typeof useBlogToolbar>
