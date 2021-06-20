import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import RssSiteFeed from '../RssSites/RssSiteFeed';
import { Col, Row, Spinner, Container, Button } from 'react-bootstrap';
import { fetchUserFeeds } from '../../Services/fetchFeed';

function UserFeed() {
    const history = useHistory();
    const [userFeeds, setUserFeeds] = useState([]);
    const [feedsloading, setFeedsLoading] = useState(true);
    const page = 1;
    useEffect(() => {
        let isSubscribed = true
        setFeedsLoading(true);
        fetchUserFeeds(page)
            .then((data) => {
                if (isSubscribed) {
                    setUserFeeds(data.rows);
                }
                setFeedsLoading(false);
            })
        return () => isSubscribed = false
    }, [])

    return (
        <div className="mt-4">
            <Container fluid="sm">
                {/* <h3 className="text-center">Check out your Recent Feeds</h3> */}
                {feedsloading &&
                    <div className="text-center mt-5">
                        <h3 className="text-center">Check out your Recent Feeds</h3>
                        <Spinner animation="border" /><span>Fetching your feed</span>
                    </div>
                }

                {(!userFeeds || !userFeeds.length > 0) &&
                    <div className="text-center">
                        <h2 className="my-2">You have not subscribed to any of the feed</h2>
                        <Button
                            className="my-2"
                            variant="success"
                            size="lg"
                            active onClick={() => history.push('/discover')}
                        >
                            Explore Feed Sites and Subscribe
                        </Button>
                    </div>
                }
                {(userFeeds && userFeeds.length > 0) && <div>
                    <h3 className="text-center">Check out your Recent Feeds</h3>
                    <Row xs={1} sm={1} md={2} lg={3} className="mt-3">
                        {userFeeds.map((rssSiteFeed, index) => (
                            <Col key={index} className="mb-4">
                                <RssSiteFeed
                                    title={rssSiteFeed.title}
                                    description={rssSiteFeed.description}
                                    link={rssSiteFeed.link}
                                    summary={rssSiteFeed.summary}
                                ></RssSiteFeed>
                            </Col>

                        ))}
                    </Row>
                    <div className="text-center">
                        <Button variant="success" size="lg" active onClick={() => history.push('/userfeeds')}>
                            Want to explore More Feeds!!
                        </Button>
                    </div>
                </div>
                }

            </Container>


        </div>
    )
}

export default UserFeed
