import React from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap'
import api from '../services/api'

export default function Habit(props) {

  const {title, description, points, habitType, id } = props

  const cardColor = habitType === 'positive' ? 'success' : 'danger'

  const deleteHabit = async (id) => {
    const user_id = localStorage.getItem('user')
    const data = await api.delete(`/habit/${id}`, {headers: {user_id }})
    props.reloadHabits()
    return data
  }

  return(
    <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
      <Card color={cardColor}>
        <CardBody>
          <CardTitle><h5>{title}</h5></CardTitle>
          <CardText>{description}</CardText>
          <CardText>points: {points}</CardText>
          <Button>Success</Button><Button>Fail</Button><Button onClick={() => deleteHabit(id)}>Delete</Button>
        </CardBody>
      </Card>
    </div>
  )
}