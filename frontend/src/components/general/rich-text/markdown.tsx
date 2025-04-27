import Code from './components/code'
import { ComponentProps, FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { cn } from '@/utils/style'

type ReactMarkdownProps = ComponentProps<typeof ReactMarkdown>

type Props = {
  content: ReactMarkdownProps['children']
  className?: string
} & Omit<ReactMarkdownProps, 'children'>

const Markdown: FC<Props> = ({ content, className }) => {
  return (
    <div className={cn('prose', className)}>
      <ReactMarkdown
        components={{
          code: Code,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
