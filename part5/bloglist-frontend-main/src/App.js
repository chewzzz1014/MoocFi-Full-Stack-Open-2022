import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogFrom'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    id: '',
    title: '',
    author: '',
    url: '',
    user: []
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setSuccessMessage({
        msg: `Welcome, ${user.username}!`,
        status: 'success'
      })
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )

    } catch (e) {
      setErrorMessage({
        msg: 'wrong username or password',
        status: 'error'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    console.log('logout')

    window.localStorage.removeItem('loggedUser')

    //blogService.setToken(user.token)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const bloglist = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLike={() => handleLike(blog._id)} />
      )}
    </div>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLike = async (id) => {
    try {
      const updateBlog = await blogService.likeBlog(id)
      setBlogs(blogs.map(b => b._id === id ? updateBlog : b))
    } catch (e) {
      setErrorMessage({
        msg: e.message,
        status: 'error'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (confirmDelete) {
      try {
        //const deletedBlog = await blogService.deleteBlog(blog._id)
        await blogService.deleteBlog(blog._id)
        setBlogs(blogs.filter(b => b._id !== blog._id))

        setSuccessMessage({
          msg: `Blog ${blog.title} deleted`,
          status: 'success'
        })
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (e) {
        setErrorMessage({
          msg: e.message,
          status: 'error'
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const addBlog = async (e) => {
    e.preventDefault()

    try {
      newBlog.user = [{
        username: user.username,
        name: user.name
      }]

      newBlog.likes = 0
      const createdBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(createdBlog))
      setSuccessMessage({
        msg: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        status: 'success'
      })
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (e) {
      setErrorMessage({
        msg: e.message,
        status: 'error'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogForm = ({ name, value }) => {
    setNewBlog({
      ...newBlog,
      [name]: value
    })
  }

  const hasLoginUI = () => (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage || successMessage || null} />
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel='new blog'>
        <button onClick={() => setCreateBlogVisible(!createBlogVisible)}>new blog</button>
        <AddBlogForm
          addBlog={addBlog}
          newBlog={newBlog}
          handleBlogForm={handleBlogForm}
        />
      </Togglable>
      {bloglist()}
    </div>
  )

  const hasNotLoginUI = () => (
    <div>
      <h1>Login to Application</h1>
      <Notification message={errorMessage || successMessage || null} />
      {loginForm()}
    </div>
  )


  return (
    <div>
      {user === null ? hasNotLoginUI() : hasLoginUI()}
    </div>
  )
}


export default App
