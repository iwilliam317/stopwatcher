import React, {Component} from 'react'
import './App.css'

class App extends Component {
    state = {seconds: 0, minutes: 0, hours: 0, isStarted: false}
    
    start = () => {
        const {counter} = this
        const {isStarted} = this.state

        if (isStarted) return        
        setInterval(() => counter(), 1000)
    }
    
    counter = () => {
        let {seconds, minutes, hours} = this.state
        seconds++
        if (seconds >= 60) {
            seconds = 0
            minutes++
            if (minutes >= 60) {
                minutes = 0
                hours++
            }
        }
        this.setState({seconds, minutes, hours, isStarted: true})
    }

    formatTime = number => {
        return (number ? (number > 9 ? number : "0" + number) : "00")
    }

    render () {
        const {seconds, minutes, hours, isStarted} = this.state
        const {start, formatTime} = this
        return (
            <>
                <div className='stopwatcher'>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</div>
                <button onClick={start} disabled={isStarted}>Start</button>
            </>
        ) 
    }
}
export default App
