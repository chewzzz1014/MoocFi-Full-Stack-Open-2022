import { useState } from "react"
import { FormProps, Visibility, Weather } from "../types"
import { addDiary } from "../services/diaryService"
import axios from "axios"


export default function Form(props: FormProps) {
    const visibilityOptions = Object.values(Visibility).map(v => v.toString())
    const weatherOptions = Object.values(Weather).map(w => w.toString())
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState(visibilityOptions[0])
    const [weather, setWeather] = useState(weatherOptions[0])
    const [comment, setComment] = useState('')
    const [warning, setWarning] = useState('')

    function submitDiary (e: React.SyntheticEvent) {
        setWarning('')
        e.preventDefault()

        addDiary({
            date, visibility, weather, comment
        })
        .then(data => {
            setDate('')
            setVisibility(visibilityOptions[0])
            setWeather(weatherOptions[0])
            setComment('')
            props.setDiaries(props.diaries.concat(data))
        })
        .catch((error: unknown) => {
            if (axios.isAxiosError(error)) {
                setWarning(new String(error.response && error.response.data || '') as string)
                console.log(warning)
            }
        })
    }

    return (
        <form onSubmit={submitDiary}>
            <h1>Add new entry</h1>
            
            <div style={{color: "red"}}>
                {warning || ''}
            </div>

            <div>
                date
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} 
                />
            </div>

            <div>
                visibility
                <select onChange={(e) => setVisibility(e.target.value)}>
                    {
                        visibilityOptions.map((op, idx) => (
                            <option 
                                key={idx}
                                value={op}
                                selected={op === visibility}
                            >
                                {op}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div>
                weather
                <select onChange={(e) => setWeather(e.target.value)}>
                    {
                        weatherOptions.map((op, idx) => (
                            <option 
                                key={idx}
                                value={op}
                                selected={op === weather}
                            >
                                {op}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div>
                comment
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} 
                />
            </div>
            <button type="submit">add</button>
        </form>
    ) 
}
