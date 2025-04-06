import { FC } from 'react'
import { IconType } from 'react-icons'
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6'

import { ContactLink as CL } from '@/lib/strapi/queries/contact-page'

import { cn } from '@/utils/style'

import Link from '@/components/general/link'

const linkIcons = {
  email: FaEnvelope,
  linkedin: FaLinkedin,
  github: FaGithub,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  instagram: FaInstagram,
} satisfies {
  [key in CL['name']]?: IconType
}

type Props = {
  link: CL
  className?: string
}

const ContactLink: FC<Props> = ({ link, className }) => {
  const Icon = linkIcons?.[link?.name] || <span></span>

  if (!link) return null

  return (
    <Link
      href={link?.url}
      variant='secondary'
      className={cn(
        'w-full border text-center rounded px-4 py-8 flex flex-col gap-4 items-center',
        className,
      )}
    >
      <Icon aria-hidden className='text-4xl' />
      {link?.text}
    </Link>
  )
}

export default ContactLink
