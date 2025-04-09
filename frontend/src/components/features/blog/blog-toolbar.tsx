import TechnologyBadge from '../projects/technology-badge'
import { UseBlogToolbarReturn } from './hooks/use-blog-toolbar'
import { FC } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { RxDividerVertical } from 'react-icons/rx'
import { TbFilterSearch } from 'react-icons/tb'

import { cn } from '@/utils/style'

import SelectInput from '@/components/form/inputs/select-input'
import Button from '@/components/general/button'
import LayoutToggle from '@/components/general/layout-toggle'
import Tag from '@/components/general/tag'
import Popover from '@/components/layout/popover'

type Props = {
  filters: UseBlogToolbarReturn
}

const BlogToolbar: FC<Props> = ({
  filters: {
    filterOptions,
    filterValues,
    setFilterValues,
    layout,
    setLayout,
    filterMenuOpen,
    setFilterMenuOpen,
  },
}) => {
  const hasActiveFilter = !!Object.values(filterValues)?.filter(Boolean)?.length
  const { tag: activeTag, technology: activeTechnology } = filterValues

  return (
    <>
      <div className='flex items-center justify-end gap-2'>
        <div
          className={cn([
            'flex items-center flex-wrap max-sm:gap-4 max-sm:w-full',
            hasActiveFilter &&
              'rounded sm:outline outline-gray-5 outline-offset-4',
          ])}
        >
          {/* Active filters - desktop */}
          {hasActiveFilter ? (
            <div className='flex items-center gap-2 max-sm:hidden'>
              {activeTechnology ? (
                <div className='flex items-center'>
                  <Tag className='whitespace-pre-line'>
                    <div className='flex items-center justify-between gap-4 sm:gap-2'>
                      <div className='flex items-center gap-2'>
                        <TechnologyBadge
                          technology={activeTechnology}
                          size='2xs'
                          tooltip={false}
                        />
                        {activeTechnology?.displayName}
                      </div>
                      <button
                        onClick={() => {
                          setFilterValues((prev) => ({
                            ...prev,
                            technology: undefined,
                          }))
                        }}
                      >
                        <IoCloseOutline
                          aria-label='remove filter'
                          className='text-lg text-gray-10 hover:text-gray-12 transition'
                        />
                      </button>
                    </div>
                  </Tag>
                </div>
              ) : null}

              {activeTag ? (
                <div className='flex items-center'>
                  <Tag className='whitespace-pre-line'>
                    <div className='flex items-center justify-between gap-4 sm:gap-2'>
                      <div className='flex items-center gap-2'>
                        {activeTag?.name}
                      </div>
                      <button
                        onClick={() => {
                          setFilterValues((prev) => ({
                            ...prev,
                            tag: undefined,
                          }))
                        }}
                      >
                        <IoCloseOutline
                          aria-label='remove filter'
                          className='text-lg text-gray-10 hover:text-gray-12 transition'
                        />
                      </button>
                    </div>
                  </Tag>
                </div>
              ) : null}
            </div>
          ) : null}

          {hasActiveFilter ? (
            <RxDividerVertical
              aria-hidden
              className='text-2xl text-gray-5 max-sm:hidden'
            />
          ) : null}

          <Popover
            open={filterMenuOpen}
            onOpenChange={setFilterMenuOpen}
            contentProps={{ className: 'max-sm:w-[90dvw]' }}
            triggerProps={{ asChild: true }}
            trigger={
              <Button
                aria-label='open filter menu'
                variant={hasActiveFilter ? 'primary' : 'secondary'}
                className='py-2 min-h-0 max-sm:flex-1 sm:w-fit'
              >
                <TbFilterSearch aria-hidden className='text-xl' />
              </Button>
            }
          >
            <div className='flex gap-4 max-sm:flex-col'>
              {/* Tag */}
              <SelectInput
                label='Category'
                className='min-w-48'
                options={filterOptions?.tag}
                value={filterOptions?.tag?.find(
                  (opt) => opt?.value?.id === filterValues?.tag?.id,
                )}
                formatOptionLabel={(opt) => {
                  const tag = (opt as (typeof filterOptions.tag)[number])?.value
                  return <span className='capitalize'>{tag?.name}</span>
                }}
                onChange={(opt: (typeof filterOptions.tag)[number]) => {
                  setFilterValues((prev) => ({ ...prev, tag: opt?.value }))
                  setFilterMenuOpen(false)
                }}
                isClearable
                isSearchable={false}
                menuPosition='fixed'
              />

              {/* Technology */}
              <SelectInput
                label='Technology'
                className='min-w-48'
                options={filterOptions?.technology}
                value={filterOptions?.technology?.find(
                  (opt) =>
                    opt?.value?.documentId ===
                    filterValues?.technology?.documentId,
                )}
                formatOptionLabel={(opt) => {
                  const tech = (
                    opt as (typeof filterOptions.technology)[number]
                  )?.value
                  return (
                    <div className='flex items-center gap-2'>
                      <TechnologyBadge
                        technology={tech}
                        size='xs'
                        tooltip={false}
                      />
                      {tech?.displayName}
                    </div>
                  )
                }}
                onChange={(opt: (typeof filterOptions.technology)[number]) => {
                  setFilterValues((prev) => ({
                    ...prev,
                    technology: opt?.value,
                  }))
                  setFilterMenuOpen(false)
                }}
                isClearable
                isSearchable={false}
                menuPosition='fixed'
              />
            </div>
          </Popover>
        </div>

        <RxDividerVertical
          aria-hidden
          className='text-2xl text-gray-5 max-sm:hidden'
        />

        <LayoutToggle
          layout={layout}
          setLayout={setLayout}
          className='max-sm:hidden self-center'
        />
      </div>

      {/* Active filters - mobile */}
      {hasActiveFilter ? (
        <div className='sm:hidden flex items-center gap-2 flex-wrap'>
          {activeTechnology ? (
            <Tag className='whitespace-pre-line w-fit sm:hidden'>
              <div className='flex items-center justify-between gap-4 sm:gap-2'>
                <div className='flex items-center gap-2'>
                  <TechnologyBadge
                    technology={filterValues?.technology}
                    size='2xs'
                    tooltip={false}
                  />
                  {filterValues?.technology?.displayName}
                </div>
                <button
                  onClick={() => {
                    setFilterValues((prev) => ({
                      ...prev,
                      technology: undefined,
                    }))
                  }}
                >
                  <IoCloseOutline
                    aria-label='remove filter'
                    className='text-lg text-gray-10 hover:text-gray-12 transition'
                  />
                </button>
              </div>
            </Tag>
          ) : null}

          {activeTag ? (
            <Tag className='whitespace-pre-line w-fit sm:hidden'>
              <div className='flex items-center justify-between gap-4 sm:gap-2'>
                <div className='flex items-center gap-2'>
                  {filterValues?.tag?.name}
                </div>
                <button
                  onClick={() => {
                    setFilterValues((prev) => ({
                      ...prev,
                      tag: undefined,
                    }))
                  }}
                >
                  <IoCloseOutline
                    aria-label='remove filter'
                    className='text-lg text-gray-10 hover:text-gray-12 transition'
                  />
                </button>
              </div>
            </Tag>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

export default BlogToolbar
