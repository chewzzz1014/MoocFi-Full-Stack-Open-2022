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
    <div id='blog-item-details'>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button id='likes-btn' onClick={() => handleLike(blog)}>like</button></p>
      <p>{blog.user && blog.user.map(u => u.username)}
      </p>
      <button onClick={() => handleDelete(blog)}>remove</button>
    </div>
  )
  return (
    <div style={blogStyle} id='blog-item-main'>
      <span id='blog-title-author'>{blog.title} {blog.author}</span>
      <button onClick={() => setVisibility(!visibility)}>{`${!visibility ? 'view' : 'hide'}`}</button>
      {visibility && details}
    </div>
  )
}

export default Blog