import React, { useEffect, useState } from 'react'
import { Jumbotron, Col, Row, Button, Spinner, Container } from 'react-bootstrap'
import RssSite from '../RssSite/RssSite'
import { useHistory } from 'react-router-dom';
import { fetchUserSubscription } from '../../Services/subscriptionService';


function UserSubscriptions() {
    const history = useHistory();
    const [subcriptionList, setSubcriptionList] = useState([]);
    const [userSubscriptionloading, setUserSubscriptionLoading] = useState(true);
    useEffect(() => {
        setUserSubscriptionLoading(true);
        fetchUserSubscription()
            .then((data) => {
                setSubcriptionList(data);
                setUserSubscriptionLoading(false)
            })
    }, [])
    return (
        <div>
            <Jumbotron className="text-center">
                Your Subscriptions
            </Jumbotron>
            <Container fluid="sm">
            {userSubscriptionloading && 
                <div className="text-center mt-5">
                    <Spinner animation="border" /><span>Loading your subscription</span>
                    </div>
            }
            {subcriptionList.length >0 &&
                <div className="text-center">
                   <Row xs={1} sm={1} md={2} lg={3} >
                        {subcriptionList.map((subcription, index) => (
                            <Col key={index} className="mb-4">
                                <RssSite
                                    id={subcription.RssSite.id}
                                    title={subcription.RssSite.title}
                                    description={subcription.RssSite.description}
                                    imageUrl={subcription.RssSite.imageUrl}
                                    url={subcription.RssSite.url}
                                    subscriptionId ={subcription.id}
                                    fromSubscriptionlist = "true"
                                >
                                </RssSite>
                            </Col>
                        ))}
                    </Row>
                </div>
            }
            {!subcriptionList.length > 0 &&
                <div className = "text-center">
                <h2 className="my-2">You have not subscribed to any of the feed</h2>
                <Button className="my-2" variant="success" size="lg" active onClick={() => history.push('/discover')}>Click to Explore Feed Sites</Button>
                </div>
            }
            </Container>
        </div>
    )
}

export default UserSubscriptions
