import { FC } from 'react'

import { ContentBlock as CB } from '@/lib/strapi/queries/about-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { cn } from '@/utils/style'

import RichText from '@/components/general/block-content/rich-text'

const getPositionInSequence = (num: number | string | undefined, step = 4) => {
  const n = Number(num)
  if (!Number.isInteger(n) || n <= 0) {
    return undefined
  }
  const remainder = (n - 1) % step
  return remainder + 1
}

type Props = {
  content: CB | undefined
  seq: number
}

const ContentBlock: FC<Props> = ({ content, seq }) => {
  const { body, image } = content || {}
  const position = getPositionInSequence(seq + 1)
  const isEven = (position || 0) % 2 === 0

  if (!content) return null
  return (
    <div
      className={cn([
        'mx-auto__',
        position === 1 && 'lg:relative xl:left-20',
        position === 3 && 'lg:relative xl:right-20',
      ])}
    >
      <div
        className={cn([
          'size-20 md:size-24 lg:size-32 mb-4 mx-auto sm:ml-0 sm:mr-4 sm:my-auto float-none sm:float-left bg-contain bg-center bg-no-repeat',
          isEven && 'md:mr-0 md:ml-4 md:float-right',
        ])}
        style={{ backgroundImage: `url(${getStrapiImageUrl(image?.url)})` }}
      />
      <RichText
        content={body}
        className={cn([
          // isEven && 'md:ml-auto'
          'md:pt-4 lg:pt-2',
          isEven && 'pr-8',
          // position !== 2 && 'md:pl-12 xl:pl-16',
        ])}
      />
    </div>
  )
}

export default ContentBlock
