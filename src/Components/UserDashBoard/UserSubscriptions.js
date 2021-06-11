import React, { useEffect, useState } from 'react'
import { Jumbotron, Col, Row, Button } from 'react-bootstrap'
import RssSite from '../RssSites/RssSite'
import { useHistory } from 'react-router-dom';
import { fetchUserSubscription } from '../../Services/fetchUserSubscriptions';


function UserSubscriptions() {
    const history = useHistory();
    const [subcriptionList, setSubcriptionList] = useState([]);
    useEffect(() => {
        fetchUserSubscription()
            .then((data) => {
                setSubcriptionList(data);
            })
    }, [])
    return (
        <div>
            <Jumbotron className="text-center">
                Your Subscriptions
            </Jumbotron>
           
            {subcriptionList.length >0 &&
                <div className="text-center">
                    <Row xs={1} md={2} className="g-4">
                        {subcriptionList.map((rssSite, index) => (
                            <Col key={index}>
                                <RssSite
                                    title={rssSite.title}
                                    description={rssSite.description}
                                    imageUrl={rssSite.imageUrl}
                                    url={rssSite.url}
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
                <Button className="my-2" variant="success" size="lg" active onClick={() => history.push('/discover')}>Click to Explore Feeds</Button>
                </div>
            }
        </div>
    )
}

export default UserSubscriptions
