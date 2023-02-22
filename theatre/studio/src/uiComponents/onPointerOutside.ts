import {getStudioWindow} from '@theatre/studio/utils/getStudioRoot'

/**
 * Calls the callback when the mouse pointer moves outside the
 * bounds of the node.
 */
export default function onPointerOutside(
  node: Element,
  threshold: number,
  onPointerOutside: (e: MouseEvent) => void,
) {
  const containerRect = node.getBoundingClientRect()

  const onMouseMove = (e: MouseEvent) => {
    if (
      e.clientX < containerRect.left - threshold ||
      e.clientX > containerRect.left + containerRect.width + threshold ||
      e.clientY < containerRect.top - threshold ||
      e.clientY > containerRect.top + containerRect.height + threshold
    ) {
      onPointerOutside(e)
    }
  }

  const studioWin = getStudioWindow()

  studioWin.addEventListener('mousemove', onMouseMove)

  return () => {
    studioWin.removeEventListener('mousemove', onMouseMove)
  }
}
