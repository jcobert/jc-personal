'use client'

import Button from '../../button'
import { debounce } from 'lodash'
// import rangeParser from 'parse-numeric-range'
import { HTMLAttributes, useCallback, useState } from 'react'
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa6'
import { ExtraProps } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { cn } from '@/utils/style'

type Props = HTMLAttributes<HTMLElement> & ExtraProps

const Code = ({ children, className, node: _node, ...props }: Props) => {
  const match = /language-(\w+)/.exec(className || '')
  const codeString = String(children).replace(/\n$/, '')

  const [copied, setCopied] = useState(false)

  const resetCopy = useCallback(
    debounce(() => {
      setCopied(false)
    }, 5000),
    [setCopied],
  )

  const handleCopyCode = useCallback(
    async (code: string) => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        resetCopy()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to copy code: ', err)
      }
    },
    [setCopied, resetCopy],
  )

  const CopyIcon = copied ? FaClipboardCheck : FaClipboard

  // const meta = node?.data?.meta

  // const highlightLines = useCallback(
  //   (line: number) => {
  //     if (!meta || typeof line !== 'number') return {}
  //     const pattern = /{([\d,-]+)}/
  //     const metadata = meta?.replace(/\s/g, '') || ''
  //     const lineNumbers = rangeParser(
  //       (pattern?.test(metadata) ? pattern?.exec(metadata)?.[1] : '0') || '',
  //     )

  //     const data = lineNumbers?.includes(line) ? 'highlight' : undefined
  //     return data ? { data } : {}
  //   },
  //   [meta],
  // )

  return match ? (
    <div className='relative'>
      <Button
        aria-label='Copy code to clipboard.'
        color='general'
        className={cn(
          'absolute top-2 right-2 text-xl min-w-0 min-h-0 w-fit p-1 opacity-95 bg-[#62636c86]',
          copied && 'bg-transparent hover:bg-transparent',
        )}
        onClick={() => handleCopyCode(codeString)}
      >
        <CopyIcon aria-hidden />
      </Button>
      <SyntaxHighlighter
        codeTagProps={props}
        language={match[1]}
        style={vscDarkPlus}
        customStyle={{
          background: 'none',
          padding: '1rem 1.25rem',
          margin: 0,
        }}
        PreTag='div'
        wrapLongLines
        // lineProps={highlightLines}
        // showLineNumbers
        // lineNumberStyle={{ display: 'none' }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  )
}

export default Code
