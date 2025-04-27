import { FC } from 'react'

import { ContentBlock as Block } from '@/lib/strapi/queries/about-page'
import { getStrapiImageUrl } from '@/lib/strapi/utils'

import { getPositionInSequence } from '@/utils/general'
import { cn } from '@/utils/style'

import BlocksContent from '@/components/general/rich-text/blocks-content'
import Markdown from '@/components/general/rich-text/markdown'

type Props = {
  content: Block | undefined
  seq: number
}

const ContentBlock: FC<Props> = ({ content, seq }) => {
  const { body, bodyMarkdown, image } = content || {}
  const position = getPositionInSequence(seq + 1, 4)

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
        aria-hidden
        className={cn([
          'flex-none size-20 md:size-24 mb-4 sm:my-auto bg-contain bg-center bg-no-repeat',
          'border-4 border-brand-4 shadow-sm rounded-full',
        ])}
        style={{ backgroundImage: `url(${getStrapiImageUrl(image?.url)})` }}
      />

      {bodyMarkdown ? (
        <Markdown content={bodyMarkdown} />
      ) : (
        <BlocksContent content={body} />
      )}
    </div>
  )
}

export default ContentBlock
