'use client'

import { useEffect, useRef, useState } from 'react'
import fieldImage from './components/assets/field.jpg'
import basketballImage from './components/assets/basketball.png'
import footballImage from './components/assets/ball.png'
import volleyballImage from './components/assets/volleyball.png'
import humanImage from './components/assets/human.png'

type BallType = 'none' | 'basketball' | 'football' | 'volleyball' | 'human'

export default function AnimationPage() {
  const fieldWidth = 640
  const fieldHeight = 480
  const ballDiameter = 100
  const velocity = 300

  const [running, setRunning] = useState(false)
  const [ballType, setBallType] = useState<BallType>('basketball')
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const movingRight = useRef(true)
  const movingDown = useRef(true)

  const ballImages: Record<Exclude<BallType, 'none'>, string> = {
    basketball: basketballImage.src,
    football: footballImage.src,
    volleyball: volleyballImage.src,
    human: humanImage.src,
  }

  useEffect(() => {
    if (!running) return

    const timer = window.setInterval(() => {
      setPosition((current) => {
        const frameRate = 25
        const xVelocity = velocity / Math.sqrt(2)
        const yVelocity = velocity / Math.sqrt(2)
        const xMax = fieldWidth - ballDiameter - 4
        const yMax = fieldHeight - ballDiameter - 4

        let x = current.x
        if (movingRight.current) {
          x += xVelocity / frameRate
          if (x >= xMax) {
            x = xMax - (x - xMax)
            movingRight.current = false
          }
        } else {
          x -= xVelocity / frameRate
          if (x <= 0) {
            x = -x
            movingRight.current = true
          }
        }

        let y = current.y
        if (movingDown.current) {
          y += yVelocity / frameRate
          if (y >= yMax) {
            y = yMax - (y - yMax)
            movingDown.current = false
          }
        } else {
          y -= yVelocity / frameRate
          if (y <= 0) {
            y = -y
            movingDown.current = true
          }
        }

        return { x, y }
      })
    }, 40)

    return () => window.clearInterval(timer)
  }, [running])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault()
        setRunning((current) => !current)
      } else if (event.key === '0') setBallType('none')
      else if (event.key === '1') setBallType('basketball')
      else if (event.key === '2') setBallType('football')
      else if (event.key === '3') setBallType('volleyball')
      else if (event.key === '4') setBallType('human')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="mx-auto mt-3 w-fit max-w-full px-2">
      <h1 className="text-center text-xl font-bold">68075207 ปาริชาติ สมรูป</h1>

      <div
        className="relative mt-3 overflow-hidden rounded-3xl border-2 border-black"
        style={{
          width: fieldWidth,
          height: fieldHeight,
          maxWidth: 'calc(100vw - 16px)',
          aspectRatio: `${fieldWidth} / ${fieldHeight}`,
          backgroundImage: `url(${fieldImage.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="absolute rounded-full border border-cyan-400 bg-cyan-50/50 bg-cover bg-center"
          style={{
            left: position.x,
            top: position.y,
            width: ballDiameter,
            height: ballDiameter,
            maxWidth: '16%',
            maxHeight: '21%',
            backgroundImage: ballType === 'none' ? 'none' : `url(${ballImages[ballType]})`,
          }}
        />
      </div>

      <div className="mt-2 flex flex-wrap justify-between gap-3">
        <button
          className={`rounded-lg px-4 py-2 font-bold text-white ${running ? 'bg-red-600' : 'bg-green-600'}`}
          onClick={() => setRunning((current) => !current)}
        >
          {running ? 'PAUSE' : 'RUN'}
        </button>

        <div className="flex flex-wrap justify-end gap-2">
          <button className="rounded-lg border border-gray-500 px-3 py-2" onClick={() => setBallType('none')}>None</button>
          <button className="rounded-lg border border-blue-500 px-3 py-2 text-blue-700" onClick={() => setBallType('basketball')}>Basketball</button>
          <button className="rounded-lg border border-blue-500 px-3 py-2 text-blue-700" onClick={() => setBallType('football')}>Football</button>
          <button className="rounded-lg border border-blue-500 px-3 py-2 text-blue-700" onClick={() => setBallType('volleyball')}>Volley</button>
          <button className="rounded-lg border border-blue-500 px-3 py-2 text-blue-700" onClick={() => setBallType('human')}>Human</button>
        </div>
      </div>
    </div>
  )
}