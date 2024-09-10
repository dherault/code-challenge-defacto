import type { Shape } from '~types'
import getCanvasDpr from '~utils/getCanvasDpr'

function handleCanvas(
  canvas: HTMLCanvasElement,
  shapes: Shape[]
) {
  const _ = canvas.getContext('2d')!

  // Scale the canvas to match the device pixel ratio
  const dpr = getCanvasDpr(_)

  const width = window.innerWidth
  const height = window.innerHeight

  canvas.width = width * dpr
  canvas.height = height * dpr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  _.scale(dpr, dpr)

  function update() {
  }

  // Draw shapes
  function draw() {
    _.clearRect(0, 0, width, height)

    shapes.forEach(shape => {
      _.save()
      _.translate(shape.x, shape.y)
      _.translate(shape.width / 2, shape.height / 2)
      _.rotate(shape.angle)
      _.translate(-shape.width / 2, -shape.height / 2)
      _.fillStyle = shape.color
      _.fillRect(0, 0, shape.width, shape.height)
      _.restore()
    })
  }

  let stopped = false

  // Animation loop
  function step() {
    update()
    draw()

    if (stopped) return

    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)

  // Cleanup
  return () => {
    stopped = true
  }
}

export default handleCanvas
