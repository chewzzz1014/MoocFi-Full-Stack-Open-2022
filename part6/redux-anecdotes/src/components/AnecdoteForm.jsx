import React from 'react'

function AnecdoteForm({ addAnec }) {
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnec}>
                <div><input name='contentField' /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
