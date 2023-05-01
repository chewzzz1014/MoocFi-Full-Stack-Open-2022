import React from 'react'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'

function Notes({notes}) {
  return (
    <div>
      <h2>Notes</h2>
      <Table striped>
        <tbody>
          {notes.map(note =>
            <tr key={note.id}>
              <td>
                <Link to={`/notes/${note.id}`}>
                  {note.content}
                </Link>
              </td>
              <td>
                {note.user}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <ul>
        {notes.map(note =>
            <li key={note.id}>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </li> 
        )}
      </ul>
    </div>
  )
}

export default Notes
