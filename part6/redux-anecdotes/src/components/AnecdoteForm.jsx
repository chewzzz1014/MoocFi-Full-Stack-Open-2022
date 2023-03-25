import React from 'react'

function AnecdoteForm({ addAnec }) {
    return (
        <form onSubmit={addAnec}>
            <div><input name='contentField' /></div>
            <button>create</button>
        </form>
    )
}

export default AnecdoteForm
