import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link } from 'react-router-dom';
import { manageSubscribe, manageUnsubscribe,subscribeByRssUrl } from '../../Services/subscriptionService';

function RssSite(props) {
    const [subscriptionMessage, setSubscriptionMessage] = useState('');
    const [unsubscriptionMessage, setUnsubscriptionMessage] = useState('');
    function handleSubscribe() {
        if (props.fromDiscoverlist) {
            manageSubscribe(props.rssId)
                .then((res) => {
                    setSubscriptionMessage(res);
                })
                .catch((error) => {

                })
        }
        else {
            subscribeByRssUrl(props.url)
                .then((res) => {
                    setSubscriptionMessage(res);
                })
                .catch((error) => {

                })
        }

    }

    function handleUnsubscribe() {
        manageUnsubscribe(props.subscriptionId)
            .then((res) => {
                setUnsubscriptionMessage(res);
            })
            .catch((error) => {

            })
    }

    return (
        <div>
            <Card>
                <Card.Img className="p-3" variant="top" src={(props.imageUrl) ? props.imageUrl : "https://static.dw.com/image/15689691_101.jpg"} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    {((props.fromSubscriptionlist) || (props.fromDiscoverlist)) ?
                        <Link to={{
                            pathname: "/sitefeeds",
                            search: "?" + new URLSearchParams({ rssId: props.id }).toString()
                        }}
                        >
                            <Button variant="primary">Click to Check the feeds</Button>
                        </Link>

                        :
                        <Link to={{
                            pathname: "/feeds",
                            state: {
                                rssFeedUrl: props.url
                            },
                        }}
                        >
                            <Button variant="primary">Click to Check the feeds</Button>
                        </Link>
                    }

                    {props.fromSubscriptionlist &&
                        <>
                            {!unsubscriptionMessage &&
                                <Button className="m-2" variant="warning" onClick={() => handleUnsubscribe()}> Unsubscribe</Button>
                            }
                            {unsubscriptionMessage &&
                                <span className="badge bg-warning my-2"> {unsubscriptionMessage} </span>}
                        </>
                    }
                    {!props.fromSubscriptionlist &&
                        <>
                            {!subscriptionMessage &&
                                <Button className="m-2" variant="success" onClick={() => handleSubscribe()}> Subscribe</Button>
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
