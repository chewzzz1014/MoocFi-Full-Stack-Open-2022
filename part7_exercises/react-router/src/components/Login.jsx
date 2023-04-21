import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('chewzzz')
    navigate('/') // redirect to main page
  }
  return (
    <div>
        <h2>login</h2>
        <form onSubmit={onSubmit}>
            <div>
                username: <input />
            </div>
            <div>
                password: <input type='password' />
            </div>
            <button type="submit">login</button>
        </form>     
    </div>
  )
}

export default Login
