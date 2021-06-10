import React from 'react'
import { Button, Card } from 'react-bootstrap'

function RssSiteFeed(props) {
    return (
        <div className="text-center">
            <Card>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <a href={props.link} target="_blank">
                    <Button variant="primary">Vist the Feed</Button></a>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RssSiteFeed
