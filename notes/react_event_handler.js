import { useState } from 'react'


const Display = ({ counter }) => {
    return (
        <div>{counter}</div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const App = () => {
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            <Display counter={counter} />
            <Button onClick={setToZero} text='zero' />
            <Button onClick={increaseByOne} text='plus' />
            <Button onClick={decreaseByOne} text='mi us' />
        </div>
    )
}