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

  if (!content) return null
  return (
    <div
      className={cn([
        'flex max-sm:flex-col items-center gap-2 sm:gap-6 w-full justify-center',
        position === 1 && 'xl:-ml-28',
        position === 3 && 'xl:ml-28',
      ])}
    >
      <div
        className={cn([
          'flex-none size-20 md:size-24 mb-4 sm:my-auto bg-contain bg-center bg-no-repeat',
        ])}
        style={{ backgroundImage: `url(${getStrapiImageUrl(image?.url)})` }}
      />
      <RichText content={body} />
    </div>
  )
}

export default ContentBlock
