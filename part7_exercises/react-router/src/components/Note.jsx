import React from 'react'
// import {useParams} from 'react-router-dom'

function Note({note}) {
    // const id = useParams().id // get param value of the link
    // const note = notes.find(n => n.id === Number(id))
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important? 'important': ''}</strong></div>
        </div>
    )
}

export default Note
