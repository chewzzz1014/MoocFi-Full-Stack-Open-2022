// input: weight in kg, height in cm
// formula: (weight in kg) / (height in m)^2

interface BmiData{
    weight: number,
    height: number
}

const calculateBMI = (data: BmiData): number => {
    const {weight, height} = data 
    return weight/((height/100)^2)
}

const parseArguments = (args: string[]): BmiData => {
    if (args.length < 4)
        throw new Error('Not enought arguments')
    if (args.length > 4)
        throw new Error('Too many arguments')
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3])
        }
    } else{
        throw new Error('Provided values were not numbers!')
    }
}

try {
    const bmi = calculateBMI(parseArguments(process.argv))
} catch (error: unknown) {
    let errorMsg = 'Something bad happened.'
    if (error instanceof Error) {
        errorMsg += ` Error: ${error.message}`
    }
    console.log(errorMsg)
}