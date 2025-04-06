import TechnologyBadge from '../projects/technology-badge'
import { Post } from './types'
import { FC } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

import Link from '@/components/general/link'

type Props = {
  post: Post | undefined
}

const PostRow: FC<Props> = ({ post }) => {
  const { title, image, slug, technologies } = post || {}

  const postLink = `/blog/${slug}`

  if (!post) return null

  return (
    <>
      <Link
        href={postLink}
        className={cn(
          'group hover:shadow transition w-full flex max-sm:flex-col gap-x-8 sm:items-center gap-y-4 hover:bg-brand-1 p-4 border hover:border-brand-7 rounded',
        )}
      >
        <div className='max-sm:w-full w-36 flex-none'>
          {image?.url ? (
            <div
              aria-hidden
              className='max-w-36 h-32 bg-cover border group-hover:border-brand-6 shadow-sm w-full mx-auto lg:flex-initial'
              style={{
                backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
              }}
            />
          ) : (
            <div className='h-52 w-full flex items-center justify-center rounded bg-gray-1'></div>
          )}
        </div>

        <div className='flex flex-col gap-2 max-sm:items-center'>
          <h2 className='text-balance text-brand-primary max-w-prose text-xl max-sm:text-center font-medium group-hover:text-brand-dark transition'>
            {title}
          </h2>

          {technologies?.length ? (
            <div className='mt-2'>
              <div className='flex items-center gap-x-8 gap-y-2 flex-wrap'>
                {technologies?.map((t) => (
                  <TechnologyBadge key={t?.id} technology={t} size='xs' />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <FaAngleRight
          aria-hidden
          className='text-brand-primary ml-auto mr-2 lg:mr-5 xl:mr-8 flex-none group-hover:scale-125 transition-transform'
        />
      </Link>
    </>
  )
}

export default PostRow
