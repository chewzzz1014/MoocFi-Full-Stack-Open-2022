// define type
interface MultiplyValues {
    value1: number,
    value2: number
}

// parse 2 values from cli
const parseArguments = (args: String[]): MultiplyValues => {
    if (args.length < 4)
        throw new Error('Not enought arguments')
    if (args.length > 4)
        throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a * b)
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`)