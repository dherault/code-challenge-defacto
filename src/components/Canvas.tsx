import { RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { Button } from '~components/ui/Button'

import { MAX_SHAPE_SIZE, MIN_SHAPE_SIZE } from '~constants'
import usePersistedState from '~hooks/usePersistedState'
import useWindowSize from '~hooks/useWindowSize'

import handleCanvas from '~logic/handleCanvas'
import type { Shape } from '~types'
import generateRandomColor from '~utils/generateRandomColor'

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useWindowSize()

  const createShapes = useCallback(() => {
    const shapes: Shape[] = []

    for (let i = 0; i < 20; i++) {
      const shapeWidth = Math.random() * (MAX_SHAPE_SIZE - MIN_SHAPE_SIZE) + MIN_SHAPE_SIZE
      const shapeHeight = Math.random() * (MAX_SHAPE_SIZE - MIN_SHAPE_SIZE) + MIN_SHAPE_SIZE
      const shape: Shape = {
        id: Math.random(),
        x: Math.random() * (width - shapeWidth),
        y: Math.random() * (height - shapeHeight),
        width: shapeWidth,
        height: shapeHeight,
        angle: Math.random() * 2 * Math.PI,
        color: generateRandomColor(),
      }

      shapes.push(shape)
    }

    return shapes
  }, [
    width,
    height,
  ])

  const initialShapes = useMemo(() => createShapes(), [createShapes])
  const [shapes, setShapes] = usePersistedState('shapes', initialShapes)

  const refreshShapes = useCallback(() => {
    setShapes(createShapes())
  }, [
    createShapes,
    setShapes,
  ])

  useEffect(() => {
    if (!canvasRef.current) return

    return handleCanvas(canvasRef.current, shapes)
  }, [
    shapes,
  ])

  return (
    <div className="h-screen w-screen relative">
      <canvas
        ref={canvasRef}
        className="h-full"
      />
      <Button
        size="icon"
        onClick={refreshShapes}
        className="absolute top-4 right-4"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default Canvas
