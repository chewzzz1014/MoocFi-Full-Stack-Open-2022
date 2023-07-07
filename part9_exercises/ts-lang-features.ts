// type annotation
const birthdayGreeter = (name: string, age: number): string => {
    return `Happy birthday ${name}, you are now ${age} years old!`
}

const birthdayHero = "chewzzz"
const age = 21
console.log(birthdayGreeter(birthdayHero, age))

// structural typing
/*
 two elements are considered to be compatible with one another if, for each feature within the type of the first element, a corresponding and identical feature exists within the type of the second element. Two types are considered to be identical if they are compatible with each other.
*/

// type inference: try to infer type information if no type is specified
// type inference takes place when initializing variables and members, setting parameter default values, and determining function return types.
const add = (a: number, b: number) => {
    return a + b // inferred to be type number
}


