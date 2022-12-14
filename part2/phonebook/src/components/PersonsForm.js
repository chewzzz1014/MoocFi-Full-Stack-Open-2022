import React from 'react'

export default function PersonsForm(props) {

    const { handleChange, handleSubmit, newName } = props

    return (
        <form >
            <div>
                name: <input onChange={handleChange} name='name' value={newName.name} id='nameField' />
            </div>
            <div>
                number: <input onChange={handleChange} name='number' value={newName.number} id='numberField' />
            </div>
            <div>
                <button type='submit' onClick={handleSubmit}>add</button>
            </div>
        </form>
    )
}