import { isNotNumber } from "./utils";

// multiplicator that takes inputs from user and return result
interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseMultiplicator = (args: String[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a*b)
}

try{
    const {value1, value2} = parseMultiplicator(process.argv)
    multiplicator(value1, value2, `Result of ${value1} * ${value2} is`)
} catch (error: unknown) {
    let errorMsg = 'Something bad happened. '
    if (error instanceof Error) {
        errorMsg += 'Error: ' + error.message
    }
    console.log(errorMsg)
}