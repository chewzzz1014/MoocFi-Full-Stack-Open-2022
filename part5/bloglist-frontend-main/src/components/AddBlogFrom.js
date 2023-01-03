const AddBlogForm = ({
    addBlog,
    newBlog,
    handleBlogForm
}) => {
    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    name='title'
                    value={newBlog.title}
                    onChange={(e) => handleBlogForm(e.target)}
                />
            </div>
            <div>
                author:
                <input
                    name='author'
                    value={newBlog.author}
                    onChange={(e) => handleBlogForm(e.target)}
                />
            </div>
            <div>
                url:
                <input
                    name='url'
                    value={newBlog.url}
                    onChange={(e) => handleBlogForm(e.target)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default AddBlogForm