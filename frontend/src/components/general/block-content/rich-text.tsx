import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'
import { FC } from 'react'

type Props = {
  content?: BlocksContent
}

const RichText: FC<Props> = ({ content }) => {
  if (!content) return null

  return (
    <div className='prose'>
      <BlocksRenderer
        content={content}
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

export default RichText
