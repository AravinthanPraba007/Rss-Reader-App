import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function RssSite(props) {

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={(props.imageUrl) ? props.imageUrl : "https://static.dw.com/image/15689691_101.jpg"} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <Link to={{
                            pathname: "/feed",
                            state: {
                                rssFeedUrl: props.url
                            },
                        }}
                    >
                        <Button variant="primary">Click to Check the feeds</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RssSite
