import express from 'express'
import { calculator, Operation } from './calculator'
const app = express()

app.use(express.json()) // to parse json request data

// the noUnusedParameters is set to true
// prefix the unused variable with _ to inform compiler we knew abt this and nothing we can do
app.get('/ping', (_req, res) => {
    res.send('pong')
})

app.post('/calculate', (req, res) => {
    const {value1, value2, op} = req.body

    // validate input

    // type assertion
    const result = calculator(Number(value1), Number(value2), op as Operation)
    res.send({result})
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})