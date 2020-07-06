import React from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap'

export default function Habit(props) {

  const {title, description, points, habitType } = props

  const cardColor = habitType === 'positive' ? 'success' : 'danger'

  return(
    <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
      <Card color={cardColor}>
        <CardBody>
          <CardTitle><h5>{title}</h5></CardTitle>
          <CardText>{description}</CardText>
          <CardText>points: {points}</CardText>
          <Button>Success</Button><Button>Fail</Button>
        </CardBody>
      </Card>
    </div>
  )
}