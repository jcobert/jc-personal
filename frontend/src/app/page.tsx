import { Metadata } from 'next'
import { FC } from 'react'

import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

export const metadata: Metadata = {
  title: buildPageTitle('Home'),
}

const HomePage: FC = () => {
  return <PageLayout>
    <p>lorewakldshlasd flsdhfiosdh fiuadhsfioudash fjasdhfl kjsdah fp9uhpuihsh ofuhasd; lfa </p>
  </PageLayout>
}

export default HomePage
