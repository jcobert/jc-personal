import ContactLink from '../features/contact-page/contact-link'
import { FC } from 'react'
import { FaCodeBranch } from 'react-icons/fa'

import { getContactPage } from '@/lib/strapi/queries/contact-page'

import { CURRENT_YEAR, repoLink } from '@/utils/constants'

import Link from '@/components/general/link'

import { siteConfig } from '@/configuration/site'

const Footer: FC = async () => {
  const { links } = (await getContactPage()) || {}

  return (
    <div className='w-full bg-gray-11 pb-safe mt-8 print:hidden'>
      <div aria-hidden className='h-px w-full border-b border-gray-7' />

      <div className='flex max-md:px-4 max-md:flex-col-reverse items-center py-8 mx-auto text-white w-full md:layout md:py-2 gap-8 md:justify-between'>
        <p id='copyright' className='text-xs'>
          &copy; {`${CURRENT_YEAR} ${siteConfig?.title}`}
        </p>

        <div className='flex items-center gap-x-6 gap-y-4 max-md:flex-col max-md:w-full'>
          {links?.length ? (
            <div className='flex items-center max-sm:w-full max-sm:justify-around sm:gap-16 md:gap-4 max-md:py-4'>
              {links?.map((link) => (
                <ContactLink
                  key={link?.id}
                  link={link}
                  aria-label={link?.name}
                  className='[&:not(:disabled)]:hover:bg-transparent hover:text-gray-4 p-1 text-white w-fit'
                  iconClassName='md:text-2xl'
                  variant='tertiary'
                  color='general'
                  showText={false}
                />
              ))}
            </div>
          ) : null}

          <Link
            href={repoLink}
            variant='tertiary'
            className='text-sm md:text-xs font-medium text-white no-hover:active:text-gray-4'
            color='general'
          >
            <FaCodeBranch aria-hidden />
            View source code
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
