import { useState } from "react"
import { FormProps } from "../types"
import { addDiary } from "../services/diaryService"
import axios from "axios"


export default function Form(props: FormProps) {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
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
            setVisibility('')
            setWeather('')
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
                    value={date}
                    onChange={(e) => setDate(e.target.value)} 
                />
            </div>

            <div>
                visibility
                <input
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)} 
                />
            </div>

            <div>
                weather
                <input
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)} 
                />
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
