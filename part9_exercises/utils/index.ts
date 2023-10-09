export const checkIsNumber = (x: any): boolean => !isNaN(Number(x))

export const calculateBMI = (height: number, weight: number): string => {
    let bmi = weight/((height/100)^2)
    console.log(bmi)

    let healthStatus = (bmi >= 18.5 && bmi <= 24.9) ? 'Healthy weight' : 'Unhealthy weight'
    let classification = (bmi < 18.4) ? 'Underweight' : (bmi >= 18.5 && bmi <= 24.9) ? 'Normal' : (bmi >= 25 && bmi <= 39.9) ? 'Overweight' : 'Obese'
    
    return `${classification} (${healthStatus})`
}