import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { addRssSubscription } from './addRssSubscription';

function RssSite(props) {
    const [subscriptionMessage, setsubscriptionMessage] = useState('');
    
    function handleSubscribe(){
        addRssSubscription(props.url)
        .then((res) => {
            setsubscriptionMessage(res);
        })
        .catch((error) => {

        })
    }

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
                    {!props.fromSubscriptionlist &&
                    <>
                    {!subscriptionMessage && 
                    <Button className="my-2" variant="success" onClick={() => handleSubscribe()}> Subscribe</Button>
                    }
                    {subscriptionMessage && 
                        <span className="badge bg-success my-2"> {subscriptionMessage} </span>}
                    </>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default RssSite
