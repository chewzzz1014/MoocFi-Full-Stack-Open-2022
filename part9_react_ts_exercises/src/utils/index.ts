// for exhaustive type checking
// TypeScript will only allow an operation (or attribute access) if it is valid for every member of the union.
// for handle default of case of type narrowing, when encounter an unexpected value
export const assertNever = (value: never): never => {
    throw new Error (`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}