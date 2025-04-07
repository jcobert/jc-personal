import TechnologyBadge from '../projects/technology-badge'
import { Post } from './types'
import { format } from 'date-fns'
import Image from 'next/image'
import { FC } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

import RichText from '@/components/general/block-content/rich-text'
import Link from '@/components/general/link'
import StrapiImage from '@/components/general/strapi-image'
import BackgroundImage from '@/components/layout/background-image'

type Props = {
  post: Post | undefined
}

const PostRow: FC<Props> = ({ post }) => {
  const { title, description, body, createdAt, image, slug, technologies } =
    post || {}

  const postLink = `/blog/${slug}`

  if (!post) return null

  return (
    <>
      <div
        className={cn(
          'group transition w-full flex flex-col justify-center gap-4 p-4',
        )}
        // style={{
        //   backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
        // }}
      >
        <div className='flex flex-col gap-2 items-center'>
          <div
            className={cn(
              'flex flex-col gap-4 items-center rounded-md bg-cover bg-no-repeat bg-center',
            )}
            // style={{
            //   backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
            // }}
          >
            <div className='flex flex-col gap-2 items-center rounded-md py-4'>
              {/* Title */}
              <Link
                href={postLink}
                className='text-balance text-brand-primary underline hover:text-brand-light max-w-prose text-2xl max-sm:text-center font-medium transition'
              >
                <h2>{title}</h2>
              </Link>

              {/* Date */}
              {createdAt ? (
                <span className='text-xs text-gray-11 text-center'>
                  {format(createdAt, 'MMM dd, yyyy')}
                </span>
              ) : null}

              {/* Image */}
              {/* <div className='w-1/2 max-w-xs flex-none'>
                <StrapiImage
                  className='bg-cover border shadow-sm mx-auto lg:flex-initial'
                  image={image}
                />
              </div> */}

              {/* Description */}
              <p className='sm:text-lg text-balance text-center max-w-prose'>
                {description}
              </p>

              {/* Technologies */}
              {technologies?.length ? (
                <div>
                  <div className='flex items-center gap-x-8 gap-y-2 flex-wrap'>
                    {technologies?.map((t) => (
                      <TechnologyBadge key={t?.id} technology={t} size='xs' />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Body */}
          <RichText
            content={body}
            className='fade-out-b max-h-28 overflow-hidden'
          />
        </div>

        {/* CTA */}
        <Link href={postLink} variant='secondary' className='mx-auto'>
          <span>Keep reading</span>
          <FaAngleRight aria-hidden />
        </Link>
      </div>
    </>
  )
}

export default PostRow
