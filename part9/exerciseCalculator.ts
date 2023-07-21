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

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))