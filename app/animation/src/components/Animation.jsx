// Animation.jsx
import { useEffect, useRef, useState } from 'react'

import fieldImage from '../assets/field.jpg'
import basketballImage from '../assets/basketball.png'
import ballImage from '../assets/ball.png'
import volleyballImage from '../assets/volleyball.png'
import humanImage from '../assets/human.png'


const Animation = ({ fieldWidth, fieldHeight, ballRadius, velocity, keyEvent }) => {
    //default
    const _fieldWidth = fieldWidth || 640
    const _fieldHeight = fieldHeight || 480
    const _ballRadius = ballRadius || 50

    //แก้: velocity ยังไม่ได้ประกาศ
    const _velocity = velocity || 100

    //แก้: keyEvent ยังไม่ได้ประกาศ
    const _keyEvent = keyEvent || null


    useEffect(() => {
        if (_keyEvent !== null) {
            if (_keyEvent.key === ' ') setRunning(!running)
            else if (_keyEvent.key === '0') setBallType('none')
            else if (_keyEvent.key === '1') setBallType('basketball')
            else if (_keyEvent.key === '2') setBallType('football')
            else if (_keyEvent.key === '3') setBallType('volleyball')
            else if (_keyEvent.key === '4') setBallType('human')
            
        }
    }, [_keyEvent])


    //internal calculation

    const frameRata = 25 // framerate //second
    const frameTime = 1 / frameRata //frameRata //second
    const _ballDiameter = 2 * _ballRadius
    const xMax = _fieldWidth - _ballDiameter - 2 * 2

    //คิดเอง -> yMax คำนวณแบบเดียวกับ xMax แต่ใช้ความสูงของสนาม
    const yMax = _fieldHeight - _ballDiameter - 2 * 2
    //แก้: math / sqrt ต้องใช้ Math.sqrt
    const xVelocity = _velocity / Math.sqrt(2)
    //คิดเอง -> เคลื่อนที่ 45 องศา ดังนั้น vy เท่ากับ vx
    const yVelocity = _velocity / Math.sqrt(2)

    //stat
    const [ballType, setBallType] = useState('none')
    const [running, setRunning] = useState(false)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [moveRight, setMoveRight] = useState(true)
    const [moveDown, setMoveDown] = useState(true)

    const ballRef = useRef()
    const timer = useRef(null)


    useEffect(() => {
        if (running) {
            if (timer.current === null) {

                timer.current = setTimeout(() => {
                    calculateNextFrame()
                }, frameTime * 1000)
            }
        }

        return () => {
            if (timer.current !== null) {
                clearTimeout(timer.current)
                timer.current = null
            }
        }
    })

    const calculateNextFrame = () => {
        //x, y, -> [*] xNew, yNew
        // vx, vy
        // moveRight,moveDown


        ///x axis
        let xNew

        if (moveRight) {
            // -->
            xNew = x + xVelocity / frameRata

            if (xNew >= xMax) {
                xNew = xMax - (xNew - xMax)
                setMoveRight(false) // <--
            }
        } else {
            //<--
            xNew = x - xVelocity / frameRata

            if (xNew <= 0) {
                xNew = -xNew
                setMoveRight(true) //-->
            }
        }

        setX(xNew)
        //y axis (คิดเอง -> ทำแบบเดียวกับแกน x)
        let yNew

        if (moveDown) {
            // v
            yNew = y + yVelocity / frameRata

            if (yNew >= yMax) {
                yNew = yMax - (yNew - yMax)
                setMoveDown(false) // ^
            }
        } else {
            // ^
            yNew = y - yVelocity / frameRata

            if (yNew <= 0) {
                yNew = -yNew
                setMoveDown(true) // v
            }
        }

        setY(yNew)
    }


    useEffect(() => {
        if (ballType === 'none') {
            ballRef.current.style.backgroundImage = ''
        }
        else if (ballType === 'basketball') {
            ballRef.current.style.backgroundImage = `url(${basketballImage})`
        }
        else if (ballType === 'football') {
            ballRef.current.style.backgroundImage = `url(${ballImage})`
        }
        else if (ballType === 'volleyball') {
            ballRef.current.style.backgroundImage = `url(${volleyballImage})`
        }
        else if (ballType === 'human') {

          ballRef.current.style.backgroundImage = `url(${humanImage})`
        }

    }, [ballType])


    useEffect(() => {
        console.log(running)
    }, [running])


    //view
    return (
        <>
            {/*animation container}*/}
            <div
                className="mx-auto mt-3"
                style={{ width: 'fit-content' }}
            >

                {/* สนาม */}
                <div
                    className="border border-black border-2 rounded-3 position-relative"
                    style={{
                        width: `${_fieldWidth}px`,
                        height: `${_fieldHeight}px`,
                        backgroundImage: `url(${fieldImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                >

                    {/* ball */}
                    <div
                        className="border border-1 border-info rounded-circle position-absolute"
                        style={{
                            left: `${x}px`,
                            top: `${y}px`,
                            width: `${_ballDiameter}px`,
                            height: `${_ballDiameter}px`,
                            backgroundImage: `url(${basketballImage})`,
                            // backgroundImage: `url(${ballImage})`,
                            // backgroundImage: `url(${volleyballImage})`,
                            backgroundSize: 'cover',
                            backgroundColor: 'lightcyan',
                            backgroundPosition: 'center'
                        }}
                        ref={ballRef}
                    ></div>
                </div>


                {/*button row*/}
                <div className="m-1 d-flex justify-content-between gap-4">

                    {/*button run/pause*/}
                    <button
                        className={`btn ${running ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => setRunning(!running)}
                    >
                        {running ? (
                            <b className="bi bi-person-standing">
                                &nbsp;PAUSE
                            </b>
                        ) : (
                            <b className="bi bi-person-walking">
                                &nbsp;RUN
                            </b>
                        )}
                    </button>

                    {/* ball type*/}
                    <div className="d-flex justify-content-end gap-2">

                        <button
                            className="btn btn-lg btn-outline-secondary"
                            onClick={() => setBallType('none')}
                        >
                            None
                        </button>

                        <button
                            className="btn btn-lg btn-outline-primary"
                            onClick={() => setBallType('basketball')}
                        >
                            Basketball
                        </button>

                        <button
                            className="btn btn-lg btn-outline-primary"
                            onClick={() => setBallType('football')}
                        >
                            Football
                        </button>

                        <button
                            className="btn btn-lg btn-outline-primary"
                            onClick={() => setBallType('volleyball')}
                        >
                            Volley
                        </button>

                        <button
                            className="btn btn-lg btn-outline-primary"
                            onClick={() => setBallType('human')}
                        >
                            Human
                        </button>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Animation