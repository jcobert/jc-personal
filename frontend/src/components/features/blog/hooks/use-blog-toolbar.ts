import { Post, PostTag } from '../types'
import { intersectionWith, sortBy, uniqBy } from 'lodash'
import { useMemo, useState } from 'react'

import { Technology } from '@/lib/strapi/types/common'

import { SelectOption } from '@/components/form/inputs/select-input'
import { LayoutType } from '@/components/general/layout-toggle'

export const useBlogToolbar = (posts: Post[] | undefined) => {
  const [filterValues, setFilterValues] = useState<{
    technology?: Technology
    tag?: PostTag
  }>({})
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [layout, setLayout] = useState<LayoutType>('list')

  const resetAllFilters = () => {
    setFilterValues({})
  }

  const filterOptions = useMemo(() => {
    const techs = uniqBy(
      (posts || [])?.flatMap((p) => p?.technologies),
      (tech) => tech?.documentId,
    )?.filter(Boolean)

    const technology = sortBy(
      (techs || [])?.map(
        (t) =>
          ({
            label: t?.displayName,
            value: t,
          }) satisfies SelectOption<Technology>,
      ),
      (t) => t?.value?.displayName,
    )

    const tags = uniqBy(
      (posts || [])?.flatMap((p) => p?.tags),
      (tag) => tag?.id,
    )?.filter(Boolean)

    const tag = sortBy(
      (tags || [])?.map(
        (t) =>
          ({
            label: t?.name,
            value: t,
          }) satisfies SelectOption<PostTag>,
      ),
      (t) => t?.value?.name,
    )

    return { technology, tag }
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (!Object.keys(filterValues || {})) return posts || []
    const withTag =
      posts?.filter((p) => {
        return (p?.tags || [])?.some((t) => {
          return t?.id === filterValues?.tag?.id
        })
      }) || []

    const withTech =
      posts?.filter((p) => {
        return (p?.technologies || [])?.some((t) => {
          return t?.documentId === filterValues?.technology?.documentId
        })
      }) || []

    if (filterValues?.tag && filterValues?.technology) {
      return intersectionWith(
        withTag,
        withTech,
        (pTag, pTech) => pTag?.documentId === pTech?.documentId,
      )
    } else if (filterValues?.tag) {
      return withTag
    } else if (filterValues?.technology) {
      return withTech
    }
    return posts || []
  }, [posts, filterValues?.tag, filterValues?.technology])

  const hasActiveFilter = !!Object.values(filterValues)?.filter(Boolean)?.length

  return {
    filterOptions,
    filteredPosts,
    filterValues,
    setFilterValues,
    filterMenuOpen,
    setFilterMenuOpen,
    layout,
    setLayout,
    hasActiveFilter,
    resetAllFilters,
  }
}

export type UseBlogToolbarReturn = ReturnType<typeof useBlogToolbar>
