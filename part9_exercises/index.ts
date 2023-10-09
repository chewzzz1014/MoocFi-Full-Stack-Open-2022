import express from 'express'
import {checkIsNumber, calculateBMI, calculateExercise} from './utils'
const app = express()

app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    try{
        let {height, weight} = req.query
        if (!height || !weight)
            throw new Error('Height and weight are required!')
        else if (!checkIsNumber(height) || !checkIsNumber(weight))
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

app.post('/exercises', (req, res) => {
    let {daily_exercises, target} = req.body

    try{
        if (!daily_exercises || !(target === 0 || target))
            throw new Error('parameters missing')
        else if (!Array.isArray(daily_exercises) || !checkIsNumber(target)) {
            throw new Error('malformatted parameters')
        } else {
            res.json({
                result: calculateExercise(daily_exercises as number[], target as number)
            })
        }
    } catch (error: unknown) {
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