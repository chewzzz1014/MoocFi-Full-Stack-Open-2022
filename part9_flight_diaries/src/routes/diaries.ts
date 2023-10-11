import express from 'express'
import diaryService from '../services/diaryService'
import toNewDiaryEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(diaryService.getNonSensitiveEntries())
})

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id))

    if (diary) res.send(diary)
    else res.sendStatus(404)
})

router.post('/', (req, res) => {
    try{
        const newEntry = toNewDiaryEntry(req.body)

        const addedEntry = diaryService.addDiary(newEntry)
        res.json(addedEntry)
    } catch(error: unknown){
        let errorMsg = 'Something went wrong.'
        if (error instanceof Error) {
            errorMsg += `Error: ${error.message}`
        }
        res.sendStatus(400).send(errorMsg)
    }
})

export default router