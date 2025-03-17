import { Metadata } from 'next'
import { FC } from 'react'

import Button from '@/components/general/button'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

export const metadata: Metadata = {
  title: buildPageTitle('Home'),
}

const HomePage: FC = () => {
  return (
    <PageLayout>
      <div className='p-4 flex flex-col gap-8'>
        <div className='flex gap-8'>
          <Button>Primary</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className='flex gap-8'>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='secondary' disabled>
            Disabled
          </Button>
        </div>
        <div className='flex gap-8'>
          <Button variant='tertiary'>Tertiary</Button>
          <Button variant='tertiary' disabled>
            Disabled
          </Button>
        </div>

        <div className='flex'>
          <div className='size-48 bg-brand-extra-light'>extra-light</div>
          <div className='size-48 bg-brand-light'>light</div>
          <div className='size-48 bg-brand'>b</div>
          <div className='size-48 bg-brand-dark'>dark</div>
          <div className='size-48 bg-brand-extra-dark'>extra-dark</div>
        </div>

        <div className='flex'>
          <div className='size-48 bg-brand-extra-light'>a8</div>
          <div className='size-48 bg-brand-light'>a11</div>
          <div className='size-48 bg-brand'>a9</div>
          <div className='size-48 bg-brand-dark'>a10</div>
          <div className='size-48 bg-brand-extra-dark'>a12</div>
        </div>
      </div>
    </PageLayout>
  )
}

export default HomePage
