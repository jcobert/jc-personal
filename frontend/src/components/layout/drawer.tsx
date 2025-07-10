import * as Dialog from '@radix-ui/react-dialog'
import { FC } from 'react'
import { CgClose } from 'react-icons/cg'

import { cn } from '@/utils/style'

import { ModalProps } from '@/components/layout/modal'

type Props = ModalProps & {
  overlay?: boolean
}

const Drawer: FC<Props> = ({
  children,
  trigger,
  open,
  onOpenChange,
  closeButton = true,
  className = '',
  overlay = true,
  title,
  description,
}) => {
  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
        {!!trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
        <Dialog.Portal>
          {overlay ? (
            <Dialog.Overlay className='fixed inset-0 bg-black/60' />
          ) : null}
          <Dialog.Content
            className={cn([
              'fixed top-0 left-0 overflow-auto w-full shadow sm:rounded-md bg-background z-50',
              className,
            ])}
          >
            <Dialog.Title className='sr-only'>{title}</Dialog.Title>
            <Dialog.Description className='sr-only'>
              {description}
            </Dialog.Description>
            {closeButton && (
              <Dialog.Close
                className='absolute top-2 right-2 p-2'
                aria-label='Close'
              >
                <CgClose className='text-2xl rounded outline__ outline-2 outline-black' />
              </Dialog.Close>
            )}
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default Drawer
