import {prism} from '@theatre/dataverse'
import {getStudioDocument} from './getStudioRoot'

/**
 * A prism that holds the current mouse position.
 */
const mousePositionD = prism(() => {
  const [pos, setPos] = prism.state<MouseEvent | null>('pos', null)
  const studioDoc = getStudioDocument()
  prism.effect(
    'setupListeners',
    () => {
      const handleMouseMove = (e: MouseEvent) => {
        setPos(e)
      }
      studioDoc.addEventListener('mousemove', handleMouseMove)

      return () => {
        studioDoc.removeEventListener('mousemove', handleMouseMove)
      }
    },
    [],
  )

  return pos
})

export default mousePositionD
