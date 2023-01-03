const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} {blog._id}
  </div>
)

export default Blog