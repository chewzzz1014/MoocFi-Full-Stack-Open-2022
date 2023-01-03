import { useState } from "react"

function Blog({ blog, handleDelete, handleLike }) {

  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = (
    <>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
      {blog.user && blog.user.map(u => <p>{u.username}</p>)}
      <button onClick={() => handleDelete(blog)}>remove</button>
    </>
  )
  //console.log(blog)
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisibility(!visibility)}>{`${!visibility ? 'view' : 'hide'}`}</button>
      {visibility && details}
    </div>
  )
}

export default Blog