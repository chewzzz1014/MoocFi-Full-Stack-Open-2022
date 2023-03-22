import store from './store/store'

function App() {
    return (
        <div>
            <div>{store.getState()}</div>

            <button
                onClick={() => store.dispatch({ type: 'INCREMENT' })}
            >
                Plus
            </button>

            <button
                onClick={() => store.dispatch({ type: 'DECREMENT' })}
            >
                Minus
            </button>

            <button
                onClick={() => store.dispatch({ type: 'ZERO' })}
            >
                Zero
            </button>
        </div>
    )
}

export default App
