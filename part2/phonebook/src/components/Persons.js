import React from 'react'

export default function Persons(props) {
    const { results } = props

    const personsElements = results.map((ele) => {
        return <li>{`${ele.name} ${ele.number}`}</li>
    })

    return (
        <ul>
            {personsElements}
        </ul>
    )
}