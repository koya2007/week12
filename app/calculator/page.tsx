'use client'

import { useEffect, useState } from 'react'

type CalculatorState = 'first' | 'operator' | 'second'

export default function Page() {
  const [state, setState] = useState<CalculatorState>('first')
  const [display, setDisplay] = useState('0')
  const [first, setFirst] = useState(0)
  const [operator, setOperator] = useState('?')
  const [lastSecond, setLastSecond] = useState<number | null>(null)
  const [memory, setMemory] = useState(0)

  const renderDisplay = (value: string) => {
    if (value === 'Error') return value
    const negative = value.startsWith('-')
    const unsigned = negative ? value.slice(1) : value
    const [whole, decimal] = unsigned.split('.')
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    const result = decimal === undefined ? grouped : `${grouped}.${decimal}`
    return negative ? `-${result}` : result
  }

  const numberClick = (number: string) => {
    if (state === 'first') {
      setDisplay((current) => current === '0'
        ? number
        : current.length < 9 ? `${current}${number}` : current)
    } else if (state === 'operator') {
      setDisplay(number)
      setState('second')
    } else {
      setDisplay((current) => current === '0'
        ? number
        : current.length < 9 ? `${current}${number}` : current)
    }
  }

  const operatorClick = (nextOperator: string) => {
    if (state === 'first') {
      setFirst(Number(display))
      setOperator(nextOperator)
      setState('operator')
      return
    }

    if (state === 'operator') {
      setOperator(nextOperator)
      return
    }

    const secondValue = Number(display)
    let result = first
    if (operator === '+') result = first + secondValue
    else if (operator === '-') result = first - secondValue
    else if (operator === '*') result = first * secondValue
    else if (operator === '/') result = secondValue === 0 ? Number.NaN : first / secondValue

    setFirst(result)
    setDisplay(Number.isFinite(result) ? String(result) : 'Error')
    setOperator(nextOperator)
    setState('operator')
  }

  const equalClick = () => {
    if (state === 'second') {
      const second = Number(display)
      setLastSecond(second)
      let result = 0
      if (operator === '+') result = first + second
      else if (operator === '-') result = first - second
      else if (operator === '*') result = first * second
      else if (operator === '/') result = second === 0 ? Number.NaN : first / second

      setDisplay(Number.isFinite(result) ? String(result) : 'Error')
      setFirst(result)
      setState('first')
    } else if (state === 'first') {
      if (operator === '?') {
        const repeated = Number(display)
        const result = repeated + repeated
        setLastSecond(repeated)
        setDisplay(String(result))
        setFirst(result)
      } else if (lastSecond !== null) {
        let result = Number(display)
        if (operator === '+') result += lastSecond
        else if (operator === '-') result -= lastSecond
        else if (operator === '*') result *= lastSecond
        else if (operator === '/') result /= lastSecond
        setDisplay(String(result))
        setFirst(result)
      }
    }
  }

  const ceClick = () => {
    setState('first')
    setDisplay('0')
    setFirst(0)
    setOperator('?')
    setLastSecond(null)
  }

  const decimalClick = () => {
    if (state === 'operator') {
      setDisplay('0.')
      setState('second')
    } else {
      setDisplay((current) => current.includes('.') ? current : `${current}.`)
    }
  }

  const percentClick = () => {
    if (display !== 'Error') setDisplay(String(Number(display) / 100))
  }

  const sqrtClick = () => {
    if (display === 'Error') return
    const value = Number(display)
    setDisplay(value < 0 ? 'Error' : String(Math.sqrt(value)))
    setState('first')
  }

  const reciprocalClick = () => {
    if (display === 'Error') return
    const value = Number(display)
    setDisplay(value === 0 ? 'Error' : String(1 / value))
    setState('first')
  }

  const toggleSignClick = () => {
    if (display === '0' || display === 'Error') return
    setDisplay((current) => current.startsWith('-') ? current.slice(1) : `-${current}`)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) numberClick(event.key)
      else if (event.key === '.') decimalClick()
      else if (event.key === 'Enter' || event.key === '=') equalClick()
      else if (event.key === 'Escape') ceClick()
      else if (event.key === '+') operatorClick('+')
      else if (event.key === '-') operatorClick('-')
      else if (event.key === '*') operatorClick('*')
      else if (event.key === '/') operatorClick('/')
      else if (event.key === '%') percentClick()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <div className="calculator-page">
      <div className="calculator">
        <div className="outer">
          <div className="inner">
            <div className="screen">{renderDisplay(display)}</div>
            <div className="btn-row">
              <button className="green" onClick={() => setMemory(0)}>MC</button>
              <button className="green" onClick={() => setDisplay(String(memory))}>MR</button>
              <button className="green" onClick={() => setMemory((current) => current + Number(display))}>M+</button>
              <button className="green" onClick={() => setMemory((current) => current - Number(display))}>M-</button>
              <button className="red" onClick={ceClick}>CE</button>
            </div>
            <div className="btn-row">
              {[7, 8, 9].map((number) => (
                <button key={number} className="purple" onClick={() => numberClick(String(number))}>{number}</button>
              ))}
              <button className="green" onClick={() => operatorClick('/')}>÷</button>
              <button className="green" onClick={sqrtClick}>√</button>
            </div>
            <div className="btn-row">
              {[4, 5, 6].map((number) => (
                <button key={number} className="purple" onClick={() => numberClick(String(number))}>{number}</button>
              ))}
              <button className="green" onClick={() => operatorClick('*')}>×</button>
              <button className="green" onClick={percentClick}>%</button>
            </div>
            <div className="btn-row">
              {[1, 2, 3].map((number) => (
                <button key={number} className="purple" onClick={() => numberClick(String(number))}>{number}</button>
              ))}
              <button className="green" onClick={() => operatorClick('-')}>−</button>
              <button className="green" onClick={reciprocalClick}>1/x</button>
            </div>
            <div className="btn-row">
              <button className="purple" onClick={() => numberClick('0')}>0</button>
              <button className="purple" onClick={decimalClick}>.</button>
              <button className="green" onClick={toggleSignClick}>+/−</button>
              <button className="green" onClick={() => operatorClick('+')}>+</button>
              <button className="green" onClick={equalClick}>=</button>
            </div>
          </div>
          <div className="student">68075207 PARICHARD SOMROOP</div>
        </div>
      </div>
      <style jsx>{`
        .calculator-page { display: grid; place-items: center; min-height: 520px; padding: 30px 0; font-size: 1.25rem; text-align: center; font-family: sans-serif; }
        .calculator { width: 270px; }
        .outer { width: 270px; box-sizing: border-box; border: 1px solid black; border-radius: 18px 18px 0 0; background: black; padding: 8px; }
        .inner { border: 5px solid grey; border-radius: 15px; padding: 10px; background: linear-gradient(to bottom right, white, gray); }
        .screen { height: 3.2rem; border: 1px solid gray; border-radius: 10px; background: rgb(207, 255, 255); display: flex; justify-content: flex-end; align-items: center; padding: 0 .75rem .25rem; font-size: 2.2rem; font-weight: bold; line-height: 1; margin-bottom: 25px; overflow: hidden; }
        .btn-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin-top: 5px; }
        button { width: 100%; height: 45px; border-radius: 10px; background: white; font-weight: bold; font-size: 1.2rem; cursor: pointer; }
        .green { background: rgb(138, 243, 138); }
        .red { background: rgb(248, 6, 58); color: white; }
        .purple { background: rgb(172, 120, 220); color: white; }
        .student { color: rgb(184,175,175); text-align: center; font-family: monospace; font-size: 1rem; margin-top: 4px; }
      `}</style>
    </div>
  )
}
