// input: an array of exercise hours for each day in training period, target amount of daily hours
// output: analysis

interface Result {
    periodLength: number // number of days
    trainingDays: number // number of training days
    success: boolean // is average > target
    rating: number // in range of 1-3 that tells how well hours are met
    ratingDescription: string // based on rating
    target: number // the given target amount of daily hours
    average: number // average daily hours in the given period (sum/periodLength)
}

interface ParsedResult {
    hours: number[]
    target: number
}

const getRating = (average: number, target: number): [rating: number, ratingDescription: string] => {
    if (average >= target) {
        return [1, 'excellent!']
    } else if ((target - average) < 1) {
        return [2, 'not too bad but could be better']
    } else {
        return [3, 'needs more exercises!']
    }
}

const calculateExercise = (hours: number[], target: number): Result => {
    let periodLength = hours.length
    let trainingDays = 0
    let sumHours = 0
    
    for (let h of hours) {
        if (h === 0)
            continue
        else {
            trainingDays++
            sumHours += h
        }
    }
    let average = sumHours / periodLength
    let [rating, ratingDescription] = getRating(average, target)

    return {
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    }
}

// arguments: 'run' 'calculateExercises' 'target' [list of hours]
const parseArgumentsArr = (args: string[]): ParsedResult => {
    let target: number, hours: number[]

    if (args.length < 4)
        throw new Error('Not enought argument. It\'s mandatory to have at least one day of exercises hour.')
    
    // 'npm': 0th; 'run': 1st
    hours = args.slice(3, args.length)
                    .map(x => {
                        if (isNaN(Number(x)))
                            throw new Error('Provided hours were not numbers!')
                        else
                            return Number(x)
                    })

    // validate target value
    if (isNaN(Number(args[2]))) {
        throw new Error('Target value is not number!')
    } else {
        target = Number(args[2])
    }

    return {
        hours,
        target
    }
}

// console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))

try{
    const {hours, target} = parseArgumentsArr(process.argv)
    console.log(calculateExercise(hours, target))
} catch(error: unknown) {
    let errorMsg = 'Something bad happened.'
    if (error instanceof Error)
        errorMsg += ` Error: ${error.message}`
    console.log(errorMsg)
}