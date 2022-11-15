const Welcome = (props) => {
    return (
        <div>
            <p><b>Welcome to React, {props.name}</b></p>
            <p>{props.name} is {props.age} years old.</p>
        </div>
    )
}

function App() {
    const now = new Date()
    const a = 10, b = 20

    return (
        <div>
            <Welcome name='chewzzz' age={20} />
            <p>Hello world, it's {now.toString()}</p>

            {/* every tag needs to be closed */}
            <br />

            <p>
                {a} plus {b} is {a + b}
            </p>
        </div>
    );
}

export default App;
