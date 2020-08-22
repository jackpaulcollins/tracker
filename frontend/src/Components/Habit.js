import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap'
import { api } from '../services/services'
import { checkIsHabitDoneForDay } from '../services/services'

export default function Habit(props) {

  const {title, description, points, habitType, id, habit} = props

  const cardColor = habitType === 'positive' ? 'success' : 'danger' 

  const setHabitAsComplete = async (habitId) =>{
    const user_id = localStorage.getItem('user')
    await api.put(`/habits/mark_complete/${habitId}`, {headers: {user_id }})
    props.reloadHabits()
  }

 

  const isCompleteForDay = habit ? checkIsHabitDoneForDay(habit.daysComplete) : null

  const messageForCompleteButton = isCompleteForDay ? 'Un-complete' : 'Complete'

  return(
    <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
      <Card color={cardColor}>
        <CardBody>
           <div>
            <CardTitle><h5>{title}</h5></CardTitle>
          </div>
          <CardText>{description}</CardText>
          <CardText>points: {points}</CardText>
          <Button onClick={() => setHabitAsComplete(id)}>Mark as {messageForCompleteButton}</Button>
        </CardBody>
      </Card>
    </div>
  )
}