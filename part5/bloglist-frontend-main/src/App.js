import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    } catch (e) {
      setErrorMessage('Wrong Credentials')
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

  const addBlog = (e) => {
    e.preventDefault()

    console.log('In addBlog method!')
    console.log(newBlog)
  }

  const bloglist = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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

  const handleBlogForm = (e) => {
    const [name, value] = e.target

    setNewBlog({
      ...newBlog,
      [name]: value
    })
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          name='title'
          value={newBlog.title}
          onChange={(e) => handleBlogForm(e.target.value)}
        />
      </div>
      <div>
        author:
        <input
          name='author'
          value={newBlog.author}
          onChange={(e) => handleBlogForm(e.target.value)}
        />
      </div>
      <div>
        url:
        <input
          name='url'
          value={newBlog.url}
          onChange={(e) => handleBlogForm(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const hasLoginUI = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      {blogForm()}
      {bloglist()}
    </div>
  )

  const hasNotLoginUI = () => (
    <div>
      <h1>Login to Application</h1>
      {loginForm()}
    </div>
  )

  return (
    <div>
      {user ? hasLoginUI() : hasNotLoginUI()}
    </div>
  )
}

export default App
