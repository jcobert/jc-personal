import * as Tab from '@radix-ui/react-tabs'
import { FC, ReactNode } from 'react'

type Props = {
  tabs?: { trigger?: ReactNode; content?: ReactNode }[]
}

const Tabs: FC<Props> = ({ tabs = [] }) => (
  <Tab.Root className='' defaultValue='tab-0'>
    <Tab.List className='flex items-end gap-x-[2px] bg-gray-4 dark:bg-gray-12 rounded-md mb-4'>
      {tabs?.map((tab, i) => (
        <Tab.Trigger
          key={i}
          className='px-2 sm:px-4 py-4 max-md:flex-1 flex items-center justify-center leading-none select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_0_0_0,0_2px_0_0] data-[state=active]:shadow-brand-primary data-[state=active]:focus:relative outline-none transition data-[state=inactive]:text-gray-12 data-[state=active]:cursor-default data-[state=active]:bg-gray-2 dark:data-[state=inactive]:bg-gray-11 dark:data-[state=inactive]:text-gray-4 data-[state=inactive]:bg-gray-3 data-[state=active]:text-brand-primary data-[state=inactive]:hover:text-gray-12 data-[state=inactive]:hover:bg-gray-5 dark:data-[state=inactive]:hover:bg-gray-10'
          value={`tab-${i}`}
        >
          {tab?.trigger}
        </Tab.Trigger>
      ))}
    </Tab.List>
    {tabs?.map((tab, i) => (
      <Tab.Content key={i} className='' value={`tab-${i}`}>
        {tab?.content}
      </Tab.Content>
    ))}
  </Tab.Root>
)

export default Tabs
