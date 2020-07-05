import React from 'react'
import {
  Card, CardText, CardTitle, CardBody,
} from 'reactstrap'

export default function DailyPointsCounter() {

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

  return (
    <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
      <Card>
          <CardBody>
            <CardTitle>Daily Points for {today}</CardTitle>
            <CardText><strong>100</strong></CardText>
          </CardBody>
        </Card>
    </div>
  )
}