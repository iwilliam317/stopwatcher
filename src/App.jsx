import React, {Component} from 'react'
import './App.css'

const INITIAL_VALUES = {seconds: 0, minutes: 0, hours: 0, isStarted: false, counterId: 0} 
class App extends Component {
    
    state = INITIAL_VALUES
    
    start = () => {
        const {counter} = this
        const {isStarted} = this.state
        let counterId
        
        if (isStarted) return        
        counterId = setInterval(() => counter(), 1000)
        this.setState({...this.state, counterId})
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

    clear = () => {
        this.stop(this.state.counterId)
        this.setState(INITIAL_VALUES)
    }

    stop = counterId => {
        clearInterval(counterId);
    }

    formatTime = number => {
        return (number ? (number > 9 ? number : "0" + number) : "00")
    }

    render () {
        const {seconds, minutes, hours, isStarted, counterId} = this.state
        const {start, stop, clear, formatTime} = this
        return (
            <>
                <div className='stopwatcher'>
                    {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
                </div>
                <div className='buttons'>
                    <button onClick={start} disabled={isStarted}>
                        Start
                    </button>
                    <button onClick={() => stop(counterId)}>
                        Stop
                    </button>
                    <button onClick={clear}>
                        Clear
                    </button>
                </div>
            </>
        ) 
    }
}
export default App
