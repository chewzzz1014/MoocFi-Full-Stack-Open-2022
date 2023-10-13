import diagnosesData from '../../data/diagnoses'
import { Diagnosis } from '../types'

const getDiagnoses = (): Diagnosis[] => {
    return diagnosesData
}

const getDiagnosesByCode = (code: string): Diagnosis => {
    return diagnosesData.find(x => x.code === code)!
}

const getAllDiagnosesByCode = (codes: string[]): Diagnosis[] => {
    return diagnosesData.filter(c => codes.includes(c.code))
}

export default {
    getDiagnoses, getDiagnosesByCode, getAllDiagnosesByCode
}