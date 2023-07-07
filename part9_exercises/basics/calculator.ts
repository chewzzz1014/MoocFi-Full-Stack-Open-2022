// create a ts type
// union type
type Operation = 'multiply' | 'add' | 'divide'

const calculator = (a: number, b: number, op: Operation) => {
    switch(op) {
        case 'multiply':
            return a * b
        case 'add':
            return a + b
        case 'divide':
            return (b === 0) ? 'can\'t divide by 0' : a/b
    }
}

