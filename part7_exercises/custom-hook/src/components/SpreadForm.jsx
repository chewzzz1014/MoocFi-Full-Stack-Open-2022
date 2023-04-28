import useField from "../custom-hook/useField"

// using spread syntax for input's fields
function SpreadForm() {
    const name = useField('text')
    const born = useField('date')
    const height = useField('number')

    return (
        <div>
            <h1>Spread Form</h1>
            <form>
                name:
                <input {...name}/>
                <br />

                birthdate:
                <input {...born} />
                <br />

                height
                <input {...height} />
            </form>
        </div>
    )
}

export default SpreadForm
