const AddBlogForm = ({
    addBlog,
    handleBlogForm
}) => {
    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    name='title'
                    value=''
                    onChange={(e) => handleBlogForm(e.target)}
                    id='title-input'
                />
            </div>
            <div>
                author:
                <input
                    name='author'
                    value=''
                    onChange={(e) => handleBlogForm(e.target)}
                    title='author-input'
                />
            </div>
            <div>
                url:
                <input
                    name='url'
                    value=''
                    onChange={(e) => handleBlogForm(e.target)}
                    title='url-input'
                />
            </div>
            <button type="submit" id='submit-blog'>create</button>
        </form>
    )
}

export default AddBlogForm