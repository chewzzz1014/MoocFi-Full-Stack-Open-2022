import React from 'react'

export default function Filter(props) {

    const { filter } = props

    return (
        <form>
            <div>
                filter shown with <input onChange={filter} />
            </div>
        </form>
    )
}