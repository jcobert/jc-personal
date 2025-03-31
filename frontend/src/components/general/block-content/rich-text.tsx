import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'
import { FC } from 'react'

type Props = {
  content?: BlocksContent
}

const RichText: FC<Props> = ({ content }) => {
  if (!content) return null

  return <BlocksRenderer content={content} />
}

export default RichText
