// create a ts type
// union type
type Operation = 'multiply' | 'add' | 'divide'

const calculator = (a: number, b: number, op: Operation): number | string=> {
    switch(op) {
        case 'multiply':
            return a * b
        case 'add':
            return a + b
        case 'divide':
            return (b === 0) ? 'can\'t divide by 0' : a/b
        default:
            throw new Error('Operation is not multiply, add or divide!')
    }
}

try{
    console.log(calculator(2, 4, 'add'))
} catch(error: unknown) {
    let errorMsg = 'Something went wrong: '
    if (error instanceof Error) {
        errorMsg += error.message
    }
    console.log(errorMsg)
}
