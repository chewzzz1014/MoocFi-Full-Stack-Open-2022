import patientData from '../../data/patients'
import { ProtectedPatient } from '../types'

const getPatient = (): ProtectedPatient[] => {
    return patientData
}

export default {
    getPatient
}

