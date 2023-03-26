import React from 'react'
import { filter } from '../actions/filter'
import { useDispatch } from 'react-redux'

function Filter() {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(filter(event.target.value))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter
