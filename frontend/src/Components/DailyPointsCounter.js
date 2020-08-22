import React, { useState, useEffect } from 'react'
import {
  Card, CardText, CardTitle, CardBody,
} from 'reactstrap'
import { api } from '../services/services'
import {getCurrentDate} from '../services/services'

export default function DailyPointsCounter(props) {

  const [ dailyPoints, setDailyPoints ] = useState(0)

  useEffect(() => {
    getDailyPoints().then(response => {
      const points = response.data.points
      setDailyPoints(points)
    })
  });

  const getDailyPoints = async () => {
    const user_id = localStorage.getItem('user')
    const data = await api.get(`/habits/dailyPoints`, {headers: {user_id }})
    return data
  }

  const today = () => {

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(today.getFullYear());
    
    today = yyyy+ '/' + mm + '/' + dd
    
    return today
    }

  return (
    <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
      <Card>
          <CardBody>
            <CardTitle>Daily Points for {today()}</CardTitle>
            <CardText><strong>{dailyPoints}</strong></CardText>
          </CardBody>
        </Card>
    </div>
  )
}