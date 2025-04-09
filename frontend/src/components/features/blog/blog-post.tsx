import TechnologyBadge from '../projects/technology-badge'
import { Post } from './types'
import { format } from 'date-fns'
import { FC } from 'react'

import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { fullName } from '@/utils/string'

import Avatar from '@/components/general/avatar'
import RichText from '@/components/general/block-content/rich-text'
import Divider from '@/components/general/divider'
import Tag from '@/components/general/tag'

type Props = {
  post?: Post | null
}

const BlogPost: FC<Props> = ({ post }) => {
  const { title, body, image, technologies, tags, createdAt, author } =
    post || {}

  if (!post) return null

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col items-center gap-x-8 gap-y-6 bg-clip-text border-b__ bg-gradient-to-br from-brand-primary to-brand-8'>
        <div className='prose'>
          <h1 className='text-center text-transparent'>{title}</h1>
        </div>

        {/* Image */}
        {image?.url ? (
          <div className='w-full'>
            <div
              className='h-60 w-11/12 sm:w-full max-w-lg mx-auto md:h-72 lg:h-72 bg-cover border border-gray-5 rounded shadow-md md:shadow-lg'
              style={{
                backgroundImage: `url(${getStrapiImageUrl(image?.url)})`,
              }}
            />
          </div>
        ) : null}

        {createdAt ? (
          <div className='flex items-center gap-2'>
            {author ? (
              <Avatar
                image={getStrapiImageUrl(author?.photo?.url)}
                name={author?.firstName}
                size='xs'
              />
            ) : null}
            <span className='text-center text-sm text-gray-11'>
              {`${format(createdAt, 'MMM dd, yyyy')}${author ? ` by ${fullName(author?.firstName, author?.lastName)}` : ''}`}
            </span>
          </div>
        ) : null}

        {/* Technologies */}
        {technologies?.length || tags?.length ? (
          <div className='flex flex-col gap-4 w-fit mx-auto'>
            <div className='flex flex-wrap justify-evenly gap-4'>
              {(technologies || [])?.map((tech) => (
                <TechnologyBadge
                  key={tech?.id}
                  technology={tech}
                  size='xs'
                  // showText
                />
              ))}
              {(tags || [])?.map((t) => (
                <Tag key={t?.id} className='text-xs'>
                  {t?.name}
                </Tag>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <Divider className='w-full' />

      <RichText className='mx-auto' content={body} />
    </div>
  )
}

export default BlogPost
