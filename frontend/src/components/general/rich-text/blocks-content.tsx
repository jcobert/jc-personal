import {
  BlocksRenderer,
  BlocksContent as Content,
} from '@strapi/blocks-react-renderer'
import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  content?: Content
  className?: string
}

const BlocksContent: FC<Props> = ({ content, className }) => {
  if (!content) return null

  return (
    <div className={cn('prose', className)}>
      <BlocksRenderer
        content={content}
        /**
         * Custom blocks currently can't be used -
         * An issue with the component throws error.
         * Revisit once fixed by Strapi.
         */
        // blocks={{
        //   heading: ({ level, children }) => {
        //     switch (level) {
        //       case 1:
        //         return <h1>{children}</h1>
        //       case 2:
        //         return <h2>{children}</h2>
        //       case 3:
        //         return <h3>{children}</h3>
        //       case 4:
        //         return <h4>{children}</h4>
        //       case 5:
        //         return <h5>{children}</h5>
        //       case 6:
        //         return <h6>{children}</h6>
        //       default:
        //         return <h1>{children}</h1>
        //     }
        //   },
        // }}
      />
    </div>
  )
}

export default BlocksContent
