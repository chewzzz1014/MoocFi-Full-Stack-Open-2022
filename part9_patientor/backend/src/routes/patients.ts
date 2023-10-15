import express from 'express'
import patientService from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getPatient())
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    res.send(patientService.getSelectedPatient(id))
})

// router.post('/:id/entries', (req, res) => {
//     const {id} = req.params
// })
export default router