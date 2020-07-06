import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../../services/api'
import { Container, Button, Form, Input, Label,} from 'reactstrap'

  //Habits page will show all habits

export default function HabitsPage() {
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ points, setPoints ] = useState('')
  const [ habitType, setHabitType ] = useState('')
  const [ redirect, setRedirect ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState(false)

  const submitHandler = async (e) => {

    e.preventDefault()

    //Need to handle converting points to negative if habit negative
    const user_id = localStorage.getItem('user')
    const habitData = new FormData()
    habitData.append('title', title)
    habitData.append('description', description)
    habitData.append('points', points)
    habitData.append('habitType', habitType)

    

      try {
            if ( title !== ''
                && description !== '' 
                && points !== '' 
                && habitType !== ''
            ) {
                await api.post('/habit', habitData, {headers: {user_id }})
                setRedirect(true)
              } else {
                setErrorMessage(true)
                setTimeout(() => {
                  setErrorMessage(false)
                }, 2000)
              }
      } catch (error) {
            console.log(error.message)
        }
        
  }

  console.log(errorMessage)

  const redirectState = redirect ? <Redirect to='/dashboard'/> : ''

  return(
    <Container>
      <h1>Create Your Habit</h1>
      <Form onSubmit={submitHandler}>
        <Label>Title</Label>
        <Input id='title' type='text' onChange={(e) => setTitle(e.target.value)}/>
        <Label>Description</Label>
        <Input id='description' type='textarea' onChange={(e) => setDescription(e.target.value)}/>
        <Label>Points</Label>
        <Input id='points' type='number' onChange={(e) => setPoints(e.target.value)}/>
        <div style={{display: "flex", justifyContent: "space-around", width: "25rem", margin: "2rem"}}>
          <Label><strong>Habit Type</strong></Label>
          <Label check>
              <Input 
                type="radio" 
                name="positive" 
                checked={habitType === 'positive'}
                onChange={() => setHabitType('positive')} />
              Positive
          </Label>
          <Label check>
              <Input 
                type="radio" 
                name="negative" 
                checked={habitType === 'negative'}
                onChange={() => setHabitType('negative')} />
              Negative
          </Label>
        </div>
        <Button>Create a new Habit!</Button>
      </Form>
      {redirectState}
    </Container>
  )
}