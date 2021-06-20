import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import RssSiteFeed from '../RssSites/RssSiteFeed';
import { Col, Row, Spinner, Container, Button, Alert } from 'react-bootstrap';
import { fetchUserFeeds } from '../../Services/fetchFeed';

function UserFeeds() {
    const history = useHistory();
    const [userFeeds, setUserFeeds] = useState([]);
    const [feedsloading, setFeedsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [maximumPage, setMaximumPage] = useState(1);
    useEffect(() => {
        setFeedsLoading(true);
        fetchUserFeeds(page)
            .then((data) => {
                setUserFeeds(data.rows);
                let maxPageCount = Math.ceil((data.count) / 10);
                setMaximumPage(maxPageCount);
                setFeedsLoading(false);
            })

    }, [])


    function handleFetchPrevFeeds() {
        let pageNo = page - 1;
        setPage(pageNo);
        setFeedsLoading(true);

        fetchUserFeeds(pageNo)
            .then((data) => {
                setUserFeeds(data.rows);
                setFeedsLoading(false);
            })
    }

    function handleFetchNextFeeds() {
        let pageNo = page + 1;
        setPage(pageNo);
        setFeedsLoading(true);
        fetchUserFeeds(pageNo)
            .then((data) => {
                setUserFeeds(data.rows);
                setFeedsLoading(false);
            })
    }

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
                            Explore Feed Sites
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
                    <div className="text-center my-3">
                        <Button className="my-2" disabled={(page == 1)} variant="success" onClick={() => handleFetchPrevFeeds()}> Prev</Button>
                        <span className="mx-3">Page :{page} / {maximumPage}</span>
                        <Button className="my-2" disabled={(page == maximumPage)} variant="success" onClick={() => handleFetchNextFeeds()}> Next</Button>
                    </div>
                </div>


                }

            </Container>

        </div>
    )
}

export default UserFeeds
