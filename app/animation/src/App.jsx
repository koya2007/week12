// App.jsx
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"

import './App.css'
import Animation from './components/Animation'
import { useEffect, useState } from "react"

function App() {
  const [keyEvent, setKeyEvent] = useState(null)
  useEffect(
() => document.addEventListener('keydown',(e) => setKeyEvent(e)),
[]
  )
  ///noting alway render
  ///[] render at onLoad
  ///[x]  render when x changed

  
  return (
    <>
      <h1 className="text-center">68075207 ปาริชาติ สมรูป</h1>
      <Animation   velocity={300} keyEvent={keyEvent}/>
      {/* <Animation fieldHeight={200} fieldWidth={300} ballRadius={25}/> */}
    </>
  )
}

export default App
