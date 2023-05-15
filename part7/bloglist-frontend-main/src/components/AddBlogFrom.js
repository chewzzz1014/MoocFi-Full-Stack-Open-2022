const AddBlogForm = ({
    addBlog,
    handleBlogForm,
    newBlog
}) => {

    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    name='title'
                    value={newBlog.title}
                    onChange={(e) => handleBlogForm(e.target)}
                    id='title-input'
                />
            </div>
            <div>
                author:
                <input
                    name='author'
                    value={newBlog.author}
                    onChange={(e) => handleBlogForm(e.target)}
                    id='author-input'
                />
            </div>
            <div>
                url:
                <input
                    name='url'
                    value={newBlog.url}
                    onChange={(e) => handleBlogForm(e.target)}
                    id='url-input'
                />
            </div>
            <button type="submit" id='submit-blog'>create</button>
        </form>
    )
}

export default AddBlogForm