import { FC } from 'react'
import { FaCodeBranch } from 'react-icons/fa'

import { repoLink } from '@/utils/constants'

import Link from '@/components/general/link'

import { siteConfig } from '@/configuration/site'

const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className='w-full bg-gray-9 pb-safe mt-8 print:hidden'>
      <div aria-hidden className='h-px w-full border-b border-gray-7' />

      <div className='flex max-md:px-4 max-md:flex-col items-center py-8 mx-auto text-white w-full md:layout md:py-2 gap-8 md:justify-between'>
        <p id='copyright' className='text-xs'>
          &copy; {`${currentYear} ${siteConfig?.title}`}
        </p>

        <Link
          href={repoLink}
          variant='secondary'
          className='text-sm sm:text-xs font-medium'
          color='general'
        >
          <FaCodeBranch aria-hidden />
          View source code
        </Link>
      </div>
    </div>
  )
}

export default Footer
