import { FC, SVGAttributes } from 'react'
import { GiSpinningTop } from 'react-icons/gi'

import { cn } from '@/utils/style'

type Props = SVGAttributes<SVGElement>

const Logo: FC<Props> = ({ className, ...rest }) => {
  return (
    <GiSpinningTop
      className={cn(
        'text-white border-brand-light border p-px bg-brand-primary rounded-lg text-4xl transition',
        className,
      )}
      {...rest}
    />
  )
}

export default Logo
