import React from 'react'

function Filter(props) {

    const { filter } = props

    return (
        <form>
            <div>
                filter shown with <input onChange={(e) => filter(e)} />
            </div>
        </form>
    )
}

function Persons(props) {
    const { persons, handleDelete } = props

    const personsElements = persons.map((ele) => {
        return <li>{`${ele.name} ${ele.number}`} <button onClick={() => handleDelete(ele.id)}>Delete</button></li>
    })

    return (
        <ul>
            {personsElements}
        </ul>
    )
}

export default { Filter, Persons }
