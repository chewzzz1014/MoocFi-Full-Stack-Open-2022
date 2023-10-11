import express from 'express'
import cors from 'cors'
import diagnosesRouter from './routes/diagnoses'
import patientRouter from './routes/patients'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())
app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientRouter)

app.get('/ping', (_req, res) => {
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
