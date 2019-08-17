import React, {Component} from 'react'
import './App.css'

class App extends Component {
    state = {value: 0, isStarted: false}
    
    start = () => {
        const {counter} = this
        const {isStarted} = this.state

        if (isStarted) return        
        setInterval(() => counter(), 1000)
    }
    
    counter = () => {
        const {value} = this.state
        this.setState({value: value + 1, isStarted: true})
    }

    render () {
        const {value, isStarted} = this.state
        const {start} = this
        return (
            <>
                <div className='stopwatcher'>{value}</div>
                <button onClick={start} disabled={isStarted}>Start</button>
            </>
        ) 
    }
}
export default App
