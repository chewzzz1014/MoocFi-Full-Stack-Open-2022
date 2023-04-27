import useCounter from "../custom-hook/useCounter"

const Counter = () => {
    const counter = useCounter()
    const left = useCounter()
    const right = useCounter()

    return (
        <div>
            <h1>Counter</h1>
            <div>
                <div>{counter.value}</div>
                <button onClick={counter.increase}>
                    plus
                </button>
                <button onClick={counter.decrease}>
                    minus
                </button>
                <button onClick={counter.zero}>
                    zero
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {left.value}
                <button onClick={left.increase}>
                    left
                </button>
                <button onClick={right.increase}>
                    right
                </button>
                {right.value}
            </div>
        </div>
    )
}
export default Counter
