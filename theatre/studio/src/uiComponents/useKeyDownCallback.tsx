import {useEffect, useRef} from 'react'
import {getStudioDocument, getStudioWindow} from '@theatre/studio/utils/getStudioRoot'

type AcceptableCombo = 'Shift' | 'Meta' | 'Control' | 'Alt'

export default function useKeyDownCallback(
  combo: AcceptableCombo,
  listener: (opts: {down: boolean; event: KeyboardEvent | undefined}) => void,
) {
  const refs = useRef({combo, listener})
  refs.current = {combo, listener}
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === refs.current.combo) {
        refs.current.listener({down: true, event})
      }
    }

    function onKeyUp(event: KeyboardEvent) {
      if (event.key === refs.current.combo) {
        refs.current.listener({down: false, event})
      }
    }

    function onBlur(event: unknown) {
      refs.current.listener({down: false, event: undefined})
    }

    const studioDoc = getStudioDocument()
    const studioWin = getStudioWindow()

    studioDoc.addEventListener('keydown', onKeyDown)
    studioDoc.addEventListener('keyup', onKeyUp)
    studioWin.addEventListener('blur', onBlur)
    return () => {
      studioDoc.removeEventListener('keydown', onKeyDown)
      studioDoc.removeEventListener('keyup', onKeyUp)
      studioWin.removeEventListener('blur', onBlur)
    }
  }, [])
}
