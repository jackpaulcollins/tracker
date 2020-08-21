import React, { useState } from 'react'
import { api } from '../../services/services'
import { Container, Button, Form, FormGroup, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function Register({ history }) {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('result of submit: ', email, password, firstName, lastName)

    const response = await api.post('/user/register', { email, password, firstName, lastName })
    const userId = response.data._id || false

    if(userId) {
      localStorage.setItem('user', userId)
      history.push('/dashboard')
    } else {
      const { message } = response.data
      console.log(message)
    }

  }

  return(
    <Container>
      <h2>Sign Up!</h2>
      <p>Register for a <strong>free</strong> account</p>
      <Form onSubmit={handleSubmit}>
       <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="text" name="firstName" id="firstName" placeholder="Your first name" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="text" name="lastName" id="lastName" placeholder="Your last name" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="email" name="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="password" name="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
          <Button>Submit</Button>
          <Link to={'/'}><Button>Login</Button></Link>
        </div>
     </Form>
    </Container>
  )
}