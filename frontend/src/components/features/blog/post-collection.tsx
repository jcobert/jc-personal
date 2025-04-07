'use client'

import ProjectsToolbar from './blog-toolbar'
import { useBlogToolbar } from './hooks/use-blog-toolbar'
import PostCard from './post-card'
import PostRow from './post-row'
import { Post } from './types'
import { FC } from 'react'

import { cn } from '@/utils/style'

import Divider from '@/components/general/divider'

type Props = {
  posts: Post[] | undefined
  className?: string
}

const PostGrid: FC<Props> = ({ posts, className }) => {
  if (!posts?.length) return null
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12',
        className,
      )}
    >
      {posts?.map((p) => <PostCard key={p?.id} post={p} />)}
    </div>
  )
}

const PostList: FC<Props> = ({ posts, className }) => {
  if (!posts?.length) return null
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {posts?.map((p, i) => (
        <div key={p?.id} className='flex flex-col gap-6'>
          <PostRow post={p} />
          {i < posts?.length - 1 ? <Divider /> : null}
        </div>
      ))}
    </div>
  )
}

const PostCollection: FC<Props> = ({ posts }) => {
  const filters = useBlogToolbar(posts)
  const { filteredPosts, layout } = filters

  if (!posts?.length) return null

  return (
    <div className='flex flex-col gap-6 overflow-hidden__'>
      <ProjectsToolbar filters={filters} />

      {layout === 'list' ? (
        <>
          <PostList posts={filteredPosts} className='max-sm:hidden' />
          <PostGrid posts={filteredPosts} className='sm:hidden' />
        </>
      ) : (
        <PostGrid posts={filteredPosts} />
      )}
    </div>
  )
}

export default PostCollection
