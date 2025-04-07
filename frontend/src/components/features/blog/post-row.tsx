import TechnologyBadge from '../projects/technology-badge'
import { Post } from './types'
import { format } from 'date-fns'
import { FC } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

import RichText from '@/components/general/block-content/rich-text'
import Link from '@/components/general/link'
import Tag from '@/components/general/tag'

type Props = {
  post: Post | undefined
}

const PostRow: FC<Props> = ({ post }) => {
  const { title, body, createdAt, image, slug, technologies, tags } = post || {}

  const postLink = `/blog/${slug}`

  if (!post) return null

  return (
    <>
      <div
        className={cn(
          'group transition w-full flex flex-col justify-center gap-4 p-4',
        )}
      >
        <div className='flex flex-col gap-2 items-center'>
          <div
            className={cn(
              'flex flex-col gap-4 items-center rounded-md bg-cover bg-no-repeat bg-center',
            )}
          >
            <Link
              href={postLink}
              className='group/link flex flex-col gap-4 items-center rounded-md w-full animated-underline'
            >
              {/* Title */}
              <div className='text-balance text-brand-primary animated-underline__ hover:text-brand-light max-w-prose text-2xl max-sm:text-center font-medium transition'>
                <h2>{title}</h2>
              </div>
              {/* Image */}
              <div
                className='w-full max-w-md h-52 rounded bg-cover bg-center bg-no-repeat border border-gray-5 shadow-md group-hover/link:border-brand-8 transition'
                style={{
                  backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
                }}
              />
            </Link>

            {/* Meta */}
            <div className='flex items-center gap-4 text-xs text-gray-12'>
              {createdAt ? (
                <span className='text-center'>
                  {format(createdAt, 'MMM dd, yyyy')}
                </span>
              ) : null}
              {technologies?.length || tags?.length ? (
                <span aria-hidden className='text-gray-5'>
                  |
                </span>
              ) : null}
              {technologies?.length || tags?.length ? (
                <div className='flex items-center gap-x-4 gap-y-2 flex-wrap'>
                  {(technologies || [])?.map((t) => (
                    <TechnologyBadge key={t?.id} technology={t} size='xs' />
                  ))}
                  {(tags || [])?.map((t) => (
                    <Tag key={t?.id} className='text-xs'>
                      {t?.name}
                    </Tag>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Description */}
            {/* <p className='sm:text-lg text-balance text-center max-w-prose'>
              {description}
            </p> */}
          </div>

          {/* Body */}
          <RichText
            content={body}
            className='fade-out-b max-h-28 w-full overflow-hidden'
          />
        </div>

        <div className='flex flex-col gap-8'>
          {/* CTA */}
          <Link href={postLink} variant='secondary' className='mx-auto'>
            <span>Keep reading</span>
            <FaAngleRight aria-hidden />
          </Link>
        </div>
      </div>
    </>
  )
}

export default PostRow
