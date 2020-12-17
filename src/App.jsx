import React, { useState, useRef } from 'react'
import './App.css'
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator, AmplifySignOut, AmplifyNav } from '@aws-amplify/ui-react'
Amplify.configure(awsExports)


const App = () => {

    const INITIAL_TIME = {seconds: 0, minutes: 0, hours: 0}

    const [time, setTime] = useState(INITIAL_TIME)
    const refTime = useRef(time)
    refTime.current = time
    const [isStarted, setIsStarted] = useState(false)
    const [counterId, setCounterId] = useState(0)
 
    const start = () => {
        if (isStarted) return
        let _counterId = setInterval(() => counter(), 1000)
        setCounterId(_counterId)
    }

    const counter = () => {
        let { seconds, minutes, hours } = refTime.current
        seconds++
        if (seconds >= 60) {
            seconds = 0
            minutes++
            if (minutes >= 60) {
                minutes = 0
                hours++
            }
        }
        setTime({seconds, minutes, hours})
        setIsStarted(true)
    }

    const clear = () => {
        
        stop(counterId)
        setTime(INITIAL_TIME)
        setIsStarted(false)
        
    }

    const stop = counterId => {
        clearInterval(counterId)
        setCounterId(0)
    }

    const formatTime = number => {
        return (number ? (number > 9 ? number : "0" + number) : "00")
    }


    const { seconds, minutes, hours} = time
   
    return (
        <>

            <div className='navbar'>
                <AmplifySignOut />

            </div>
            <div className='stopwatcher'>
                {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
            </div>
            <div className='buttons'>
                <button onClick={() => start()}>
                    Start
                    </button>
                    
                <button onClick={() => stop(counterId)}>
                    Stop
                    </button>
                <button onClick={clear}>
                    Clear
                    </button>
            </div>
            <div className='rights'>
                <p><small>Created by <a href="https://github.com/iwilliam317">William Shinji</a></small></p>
            </div>
        </>
    )

}
export default withAuthenticator(App)
