import * as Tip from '@radix-ui/react-tooltip'
import { FC, ReactNode } from 'react'

export type TooltipProps = {
  trigger?: ReactNode
  triggerProps?: Tip.TooltipTriggerProps
  content?: ReactNode
  contentProps?: Tip.TooltipContentProps
  rootProps?: Tip.TooltipProps
  portalProps?: Tip.TooltipPortalProps
  arrowProps?: Tip.TooltipArrowProps
}

const Tooltip: FC<TooltipProps> = ({
  trigger,
  content,
  triggerProps,
  contentProps,
  rootProps,
  portalProps,
  arrowProps,
}) => {
  return (
    <Tip.Provider delayDuration={300}>
      <Tip.Root {...rootProps}>
        <Tip.Trigger {...triggerProps}>{trigger}</Tip.Trigger>
        <Tip.Portal {...portalProps}>
          <Tip.Content
            className='bg-[#3e3e3ef7] z-50 text-white text-sm text-balance px-4 py-2 rounded'
            sideOffset={4}
            collisionPadding={{ top: 60 }} // Accounts for header
            {...contentProps}
          >
            {content}
            <Tip.Arrow className='fill-[#3e3e3ef7]' {...arrowProps} />
          </Tip.Content>
        </Tip.Portal>
      </Tip.Root>
    </Tip.Provider>
  )
}

export default Tooltip
