import {
    Container,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper
 } from '@mui/material'
 import {Link} from 'react-router-dom'

function MUI() {
    const notes = [
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ]
    
    return (
        <Container>
            <h1>Table Demo</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {notes.map(note => (
                            <TableRow key={note.id}>
                                <TableCell>
                                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                                </TableCell>
                                <TableCell>
                                    {note.user}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
  )
}

export default MUI
