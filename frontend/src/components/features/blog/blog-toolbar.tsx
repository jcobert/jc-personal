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
    filterValue,
    setFilterValue,
    layout,
    setLayout,
    filterMenuOpen,
    setFilterMenuOpen,
  },
}) => {
  return (
    <>
      <div className='flex items-center justify-end gap-2'>
        <div
          className={cn([
            'flex items-center flex-wrap max-sm:gap-4 max-sm:w-full',
            !!filterValue &&
              'rounded sm:outline outline-gray-5 outline-offset-4',
          ])}
        >
          {/* Active filters - desktop */}
          {filterValue ? (
            <div className='flex items-center max-sm:hidden'>
              <Tag className='whitespace-pre-line'>
                <div className='flex items-center justify-between gap-4 sm:gap-2'>
                  <div className='flex items-center gap-2'>
                    <TechnologyBadge
                      technology={filterValue}
                      size='xs'
                      tooltip={false}
                    />
                    {filterValue?.displayName}
                  </div>
                  <button
                    onClick={() => {
                      setFilterValue(undefined)
                    }}
                  >
                    <IoCloseOutline
                      aria-label='remove filter'
                      className='text-lg text-gray-10 hover:text-gray-12 transition'
                    />
                  </button>
                </div>
              </Tag>
              <RxDividerVertical aria-hidden className='text-2xl text-gray-5' />
            </div>
          ) : null}

          <Popover
            open={filterMenuOpen}
            onOpenChange={setFilterMenuOpen}
            contentProps={{ className: 'max-sm:w-[90dvw]' }}
            triggerProps={{ asChild: true }}
            trigger={
              <Button
                aria-label='open filter menu'
                variant={filterValue ? 'primary' : 'secondary'}
                className='py-2 min-h-0 max-sm:flex-1 sm:w-fit'
              >
                <TbFilterSearch aria-hidden className='text-xl' />
              </Button>
            }
          >
            <SelectInput
              label='Technology'
              className='min-w-48'
              options={filterOptions}
              value={filterOptions?.find(
                (opt) => opt?.value?.documentId === filterValue?.documentId,
              )}
              formatOptionLabel={(opt) => {
                const tech = (opt as (typeof filterOptions)[number])?.value
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
              onChange={(opt: (typeof filterOptions)[number]) => {
                setFilterValue(opt?.value)
                setFilterMenuOpen(false)
              }}
              isClearable
              isSearchable={false}
              menuPosition='fixed'
            />
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
      {filterValue ? (
        <Tag className='whitespace-pre-line w-fit sm:hidden'>
          <div className='flex items-center justify-between gap-4 sm:gap-2'>
            <div className='flex items-center gap-2'>
              <TechnologyBadge
                technology={filterValue}
                size='xs'
                tooltip={false}
              />
              {filterValue?.displayName}
            </div>
            <button
              onClick={() => {
                setFilterValue(undefined)
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
    </>
  )
}

export default BlogToolbar
