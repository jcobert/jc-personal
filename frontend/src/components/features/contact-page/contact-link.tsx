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

import { ContactLink as LinkType } from '@/lib/strapi/queries/contact-page'

import { cn } from '@/utils/style'

import Link, { LinkProps } from '@/components/general/link'

const linkIcons = {
  email: FaEnvelope,
  linkedin: FaLinkedin,
  github: FaGithub,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  instagram: FaInstagram,
} satisfies {
  [key in LinkType['name']]?: IconType
}

type Props = {
  link: LinkType
  showText?: boolean
  className?: string
  iconClassName?: string
} & Partial<LinkProps>

export const ContactIcon: FC<Pick<Props, 'link' | 'className'>> = ({
  link,
  className,
}) => {
  const Icon = linkIcons?.[link?.name]

  if (!Icon) return null

  return <Icon aria-hidden className={cn('text-4xl', className)} />
}

const ContactLink: FC<Props> = ({
  link,
  showText = true,
  className,
  iconClassName,
  ...linkProps
}) => {
  if (!link) return null

  return (
    <Link
      prefetch={false}
      href={link?.url}
      variant='secondary'
      className={cn(
        'w-full border text-center rounded px-4 py-8 flex flex-col gap-4 items-center',
        className,
      )}
      {...linkProps}
    >
      <ContactIcon link={link} className={iconClassName} />
      {showText ? link?.text : null}
    </Link>
  )
}

export default ContactLink
