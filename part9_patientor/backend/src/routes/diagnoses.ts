import express from 'express'
import diagnosesService from '../services/diagnosesService'
const router = express.Router()


router.get('/', (_req, res) => {
    res.send(diagnosesService.getDiagnoses())
})

router.get('/:code', (req, res) => {
    res.send(diagnosesService.getDiagnosesByCode(req.params.code))
})

router.post('/getAll', (req, res) => {
    const codes = req.body
    res.send(diagnosesService.getAllDiagnosesByCode(codes))
})

export default router