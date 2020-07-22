import React, { useState, useEffect } from 'react'
import {
  Card, CardText, CardTitle, CardBody,
} from 'reactstrap'
import getCurrentDate from '../services/getCurrentDate'

export default function DailyPointsCounter(props) {

  const [ dailyPoints, setDailyPoints ] = useState(0)

  let today = getCurrentDate()

  useEffect(() => {
    console.log('render')
    sumDailyPoints(props.habits)
  }, [])

  const sumDailyPoints = (habits) => {
    console.log(habits)
    //goes through all of the users habits and checks if complete for day
    const today = getCurrentDate()
    let i
    for (i = 0; i < habits.length; i++){
      let currentHabit = habits[i]
      //new loop to go through the current habits daysComplete array
      let j
      console.log('here')
      for (j = 0; j < currentHabit.daysComplete.length; j++) {
        if (today == currentHabit.daysComplete[j].date && currentHabit.daysComplete[j].isComplete ) {
          setDailyPoints((dailyPoints + currentHabit.points))
        }
      }
    }
  }

  

  return (
    <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
      <Card>
          <CardBody>
            <CardTitle>Daily Points for {today}</CardTitle>
            <CardText><strong>{dailyPoints}</strong></CardText>
          </CardBody>
        </Card>
    </div>
  )
}