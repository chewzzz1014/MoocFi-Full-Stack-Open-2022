import { useField } from "../hooks"
import { useNavigate } from "react-router-dom"

const CreateNew = (props) => {
    const content = useField('content','text')
    const author = useField('author', 'text')
    const info = useField('info', 'text')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
        navigate('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button>create</button>
                <button>reset</button>
            </form>
        </div>
    )

}

export default CreateNew