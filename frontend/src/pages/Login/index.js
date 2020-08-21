import React, { useState } from 'react'
import { api } from '../../services/services'
import { Container, Button, Form, FormGroup, Input, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function Login({ history }) {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('result of submit: ', email, password)

    const response = await api.post('/login', { email, password })
    const userId = response.data._id || false

    if(userId) {
      localStorage.setItem('user', userId)
      history.push('/dashboard')
    } else {
      const { message } = response.data
      setErrorMessage(message)
    }

  }

  const errorMessageToDisplay = errorMessage ? <Alert color="danger">{errorMessage}</Alert> : ''


  return(
    <Container>
      <h2>Login:</h2>

      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="email" name="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="password" name="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
          <Button>Submit</Button>
          <Link to={'/register'}><Button>Register</Button></Link>
        </div>
     </Form>
     {errorMessageToDisplay}
    </Container>
  )
}