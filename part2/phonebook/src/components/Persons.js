import React, { useState } from 'react'

function filter(e) {
    const desired = e.target.value.toLowerCase()
    setResults(persons.filter((ele) => {
        return ele.name.toLowerCase().includes(desired)
    }))
}


function Filter() {
    return (
        <form>
            <div>
                filter shown with <input onChange={filter} />
            </div>
        </form>
    )
}

function Persons(props) {
    const { persons } = props
    const [results, setResults] = useState([])

    const personsElements = results.map((ele) => {
        return <li>{`${ele.name} ${ele.number}`}</li>
    })

    return (
        <ul>
            {personsElements}
        </ul>
    )
}

export default { Filter, Persons }
