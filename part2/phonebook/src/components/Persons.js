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
    const { persons } = props

    const personsElements = persons && persons.map((ele) => {
        return <li>{`${ele.name} ${ele.number}`}</li>
    })

    return (
        <ul>
            {personsElements || 'Not found'}
        </ul>
    )
}

export default { Filter, Persons }
