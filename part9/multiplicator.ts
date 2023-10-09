// multiplicator that takes inputs from user and return result
interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseMultiplicator = () => {
    
}

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a*b)
}

try{
    const {value1, value2} = parseArguments(process.argv)
    multiplicator(value1, value2, `Result of ${value1} * ${value2} is `)
} catch (error: unknown) {
    let errorMsg = 'Something bad happened.'
    if (error instanceof Error) {
        errorMsg += 'Error: ' + error.message
    }
    console.log(errorMsg)
}