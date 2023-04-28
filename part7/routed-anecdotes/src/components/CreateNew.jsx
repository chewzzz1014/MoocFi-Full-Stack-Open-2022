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
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form>
                <div>
                    content
                    <input 
                        type={content.type}
                        name={content.name}
                        value={content.value}
                        onChange={content.onChange}
                    />
                </div>
                <div>
                    author
                    <input
                        type={author.type}
                        name={author.name}
                        value={author.value}
                        onChange={author.onChange}
                    />
                </div>
                <div>
                    url for more info
                    <input
                        type={info.type}
                        name={info.name}
                        value={info.value}
                        onChange={info.onChange}
                    />
                </div>
                <button onClick={handleSubmit}>create</button>
                <button onClick={() => [content, author, info].forEach(x => x.reset())}>reset</button>
            </form>
        </div>
    )

}

export default CreateNew