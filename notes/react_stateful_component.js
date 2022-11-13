import { useState } from 'react'

const App = () => {

    // initialize counter = 0
    // useState return arr with 2 elements. Destructure it:
    const [counter, setCounter] = useState(0)

    // every time setCounter modify the state, component will re-render
    setTimeout(() => {
        setCounter(counter + 1)
    }, 1000)

    return (
        <div>
            {counter}
        </div>
    )
}