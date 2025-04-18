import { Post } from './types'
import { format } from 'date-fns'
import { FC } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import Link from '@/components/general/link'

type Props = {
  post?: Post
}

const PostCard: FC<Props> = ({ post }) => {
  const { title, description, image, slug, createdAt } = post || {}

  const postLink = `/blog/${slug}`

  if (!post) return null

  return (
    <div className='md:max-w-2xl w-full mx-auto rounded border border-gray-8 shadow flex flex-col'>
      <div className='flex flex-1 py-6 flex-col gap-y-6 text-left px-8 md:py-8 justify-between'>
        <Link
          href={postLink}
          className='group/link flex flex-col gap-4 items-center rounded-md w-full animated-underline__'
        >
          {/* Title */}
          <div className='text-balance text-brand-primary hover:text-brand-light max-w-prose text-2xl max-sm:text-center font-medium transition'>
            <h2>{title}</h2>
          </div>
          {/* Image */}
          <div
            className='max-w-xs aspect-video bg-cover border border-gray-5 group-hover/link:border-brand-8 shadow-sm w-full mx-auto lg:flex-initial'
            style={{
              backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
            }}
          />
        </Link>
        {/* Description */}
        <p className='sm:text-lg text-pretty grow'>{description}</p>
        {createdAt ? (
          <p className='text-xs text-gray-11 text-center'>
            {format(createdAt, 'MMM dd, yyyy')}
          </p>
        ) : null}
        {/* Tags */}
        {/* {technologies?.length || tags?.length ? (
          <div className='flex items-center gap-x-4 gap-y-2 flex-wrap justify-center'>
            {(technologies || [])?.map((t) => (
              <TechnologyBadge key={t?.id} technology={t} size='xs' />
            ))}
            {(tags || [])?.map((t) => (
              <Tag key={t?.id} className='text-xs'>
                {t?.name}
              </Tag>
            ))}
          </div>
        ) : null} */}

        {/* CTA */}
        <Link href={postLink} variant='secondary' className='mx-auto'>
          <span>Keep reading</span>
          <FaAngleRight aria-hidden />
        </Link>
      </div>
    </div>
  )
}

export default PostCard
