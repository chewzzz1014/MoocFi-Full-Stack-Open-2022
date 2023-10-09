// input: weight in kg, height in cm
// formula: (weight in kg) / (height in m)^2
import {isNotNumber} from '../utils'

interface BmiData{
    weight: number,
    height: number
}

const calculateBMI = (data: BmiData): string => {
    const {weight, height} = data 
    const bmi = weight/((height/100)^2)
    let result = ''

    if (bmi < 18.5)
        result = 'Underweight (low weight)'
    else if (bmi >= 18.5 && bmi<=22.9)
        result = 'Normal (healthy weight)'
    else if (bmi >= 23 && bmi <= 29.9)
        result = 'Overweight (slightly unhealthy weight)'
    else if (bmi >= 30)
        result = 'Obese (very unhealthy weight)'
        
    return result
}

const parseArguments = (args: string[]): BmiData => {
    if (args.length < 4)
        throw new Error('Not enought arguments')
    if (args.length > 4)
        throw new Error('Too many arguments')
    
    if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
        return {
            weight: Number(args[2]),
            height: Number(args[3])
        }
    } else{
        throw new Error('Provided values were not numbers!')
    }
}

try {
    console.log(calculateBMI(parseArguments(process.argv)))
} catch (error: unknown) {
    let errorMsg = 'Something bad happened.'
    if (error instanceof Error) {
        errorMsg += ` Error: ${error.message}`
    }
    console.log(errorMsg)
}