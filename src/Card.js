import React from 'react'
import { Card } from 'react-bootstrap'

 
export default function Cards({name, location}){
    return(
<Card className="cardbox" style={{ width: '30rem'}}>
<Card.Body>
  <Card.Title>{name}</Card.Title>
  The location entered is {location}
</Card.Body>
</Card>
)
}