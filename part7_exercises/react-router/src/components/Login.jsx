import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Form, Table, Button
} from 'react-bootstrap'

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
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type='text'
              name='username'
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type='text'
              name='password'
            />
            <Button variant='primary' type='submit'>
              login
            </Button>
          </Form.Group>
        </Form> 
    </div>
  )
}

export default Login
