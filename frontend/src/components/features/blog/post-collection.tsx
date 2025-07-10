'use client'

import BlogToolbar from './blog-toolbar'
import { useBlogToolbar } from './hooks/use-blog-toolbar'
import PostCard from './post-card'
import PostRow from './post-row'
import { Post } from './types'
import { startCase } from 'lodash'
import { FC } from 'react'

import { cn } from '@/utils/style'

import AnimateOnScroll from '@/components/animation/animate-on-scroll'
import Button from '@/components/general/button'
import Divider from '@/components/general/divider'
import NoResults from '@/components/general/no-results'

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
      {posts?.map((p) => (
        <AnimateOnScroll
          key={p?.id}
          animations={['slideInFromBottom', 'fadeIn']}
          threshold={0.1}
          className='flex flex-col gap-6'
        >
          <PostCard post={p} />
        </AnimateOnScroll>
      ))}
    </div>
  )
}

const PostList: FC<Props> = ({ posts, className }) => {
  if (!posts?.length) return null
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {posts?.map((p, i) => (
        <AnimateOnScroll
          key={p?.id}
          animations={['slideInFromBottom', 'fadeIn']}
          threshold={0.1}
          className='flex flex-col gap-6'
        >
          <PostRow post={p} />
          {i < posts?.length - 1 ? <Divider className='my-2' /> : null}
        </AnimateOnScroll>
      ))}
    </div>
  )
}

const PostCollection: FC<Props> = ({ posts }) => {
  const filters = useBlogToolbar(posts)
  const {
    filteredPosts,
    layout,
    filterValues: { tag, technology },
    resetAllFilters,
  } = filters

  if (!posts?.length)
    return (
      <NoResults
        className='mt-16'
        title='No blog posts'
        subtitle='😕'
        description="There aren't any posts yet, but please check back in the future."
      />
    )

  return (
    <div className='flex flex-col gap-6'>
      <BlogToolbar filters={filters} />

      {!filteredPosts?.length ? (
        <NoResults
          className='my-16'
          title='No posts'
          subtitle='😕'
          description={`We couldn't find any${tag?.name ? ` ${startCase(tag?.name)}` : ''}${technology?.displayName ? `${tag?.name ? ',' : ''} ${technology?.displayName}` : ''} posts.`}
          // description={
          //   <p className='inline-flex gap-1 text-balance justify-center'>
          //     <span>{`We couldn't find any`}</span>
          //     {tag?.name ? (
          //       <span className='text-brand-12 font-medium'>{`${startCase(tag?.name)}${technology?.displayName ? ',' : ''}`}</span>
          //     ) : null}
          //     {technology?.displayName ? (
          //       <span className='text-brand-12 font-medium'>
          //         {technology?.displayName}
          //       </span>
          //     ) : null}
          //     <span>posts.</span>
          //   </p>
          // }
          actions={
            <Button
              variant='secondary'
              onClick={() => {
                resetAllFilters()
              }}
            >
              Show all posts
            </Button>
          }
        />
      ) : null}

      {layout === 'list' ? (
        <PostList posts={filteredPosts} />
      ) : (
        <PostGrid posts={filteredPosts} />
      )}
    </div>
  )
}

export default PostCollection
