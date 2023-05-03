import {
    Container,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TextField,
    Button,
    Alert
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
            <div>
                {(<Alert severity="success">This is an example og Alert in Material UI</Alert>)}
            </div>
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

            <h1>Form Demo</h1>
            <form>
                <div>
                    <TextField label="username" />
                </div>
                <div>
                    <TextField label="password" type='password' />
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        login
                    </Button>
                </div>
            </form>
        </Container>
  )
}

export default MUI
