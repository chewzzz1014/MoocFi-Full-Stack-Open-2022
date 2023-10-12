import { TotalProps } from "../types"

function Total(props: TotalProps) {
    return (
        <h1>Number of exercises {props.totalExercises}</h1>
    )
}

export default Total