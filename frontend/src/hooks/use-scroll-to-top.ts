import { useLayoutEffect } from 'react'

/** Scrolls to top of page. */
export const useScrollToTop = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])
}
