import {useEffect, useState} from 'react'
import {getStudioDocument} from '@theatre/studio/utils/getStudioRoot'

export default function useHotspot(spot: 'left' | 'right') {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const studioDoc = getStudioDocument()
    const hoverListener = (e: MouseEvent) => {
      const threshold = active ? 200 : 50

      // This is a super specific solution just for now so that the hotspot region
      // excludes the pin button.
      const topBuffer = 56

      let mouseInside =
        spot === 'left' ? e.x < threshold : e.x > window.innerWidth - threshold

      mouseInside &&= e.y > topBuffer

      if (mouseInside) {
        setActive(true)
      } else {
        setActive(false)
      }
    }
    studioDoc.addEventListener('mousemove', hoverListener)

    const leaveListener = () => {
      setActive(false)
    }

    studioDoc.addEventListener('mouseleave', leaveListener)

    return () => {
      studioDoc.removeEventListener('mousemove', hoverListener)
      studioDoc.removeEventListener('mouseleave', leaveListener)
    }
  }, [active])

  return active
}
