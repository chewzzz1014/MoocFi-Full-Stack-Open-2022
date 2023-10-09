import express from 'express'
import {checkIsNumber, calculateBMI} from './utils'
const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    try{
        let {height, weight} = req.query
        if (!height || !weight)
            throw new Error('Height and weight are required!')
        if (!checkIsNumber(height) || !checkIsNumber(weight))
            throw new Error('malformatted parameters')
        else {
            res.json({
                weight: Number(weight),
                height: Number(height),
                bmi: calculateBMI(Number(height), Number(weight))
            })
        }
    } catch(error: unknown) {
        if (error instanceof Error) {
            res.status(400).send({
                error: error.message
            })
        }
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})