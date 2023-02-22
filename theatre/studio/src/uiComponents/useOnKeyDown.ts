import {useEffect, useRef} from 'react'
import {getStudioWindow} from '@theatre/studio/utils/getStudioRoot'

export default function useOnKeyDown(callback: (ev: KeyboardEvent) => void) {
  const ref = useRef(callback)
  ref.current = callback
  useEffect(() => {
    const studioWin = getStudioWindow()
    const onKeyDown = (ev: KeyboardEvent) => ref.current(ev)
    studioWin.addEventListener('keydown', onKeyDown)
    return () => {
      studioWin.removeEventListener('keydown', onKeyDown)
    }
  }, [])
}
