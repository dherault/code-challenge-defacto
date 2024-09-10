import type { Shape } from '~types'
import getCanvasDpr from '~utils/getCanvasDpr'

function handleCanvas(
  canvas: HTMLCanvasElement,
  shapes: Shape[]
) {
  console.log('shapes', shapes)

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
