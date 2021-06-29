import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import RssSiteFeed from '../RssSiteFeed/RssSiteFeed';
import { Col, Row, Spinner, Container, Button, Alert } from 'react-bootstrap';
import { fetchUserFeeds } from '../../Services/feedService';

function UserFeeds() {
    const history = useHistory();
    const [userFeeds, setUserFeeds] = useState([]);
    const [feedsloading, setFeedsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [maximumPage, setMaximumPage] = useState(1);
    const location = useLocation();
    const params = new URLSearchParams(location.search);


    useEffect(() => {
        console.log("Query param -> page : " + params.get('page'));
        let pageNoParams = params.get('page');
        if (pageNoParams) {
            setPage(parseInt(pageNoParams));
            triggerUserFeedsFetch(pageNoParams);
        }
        else {
            triggerUserFeedsFetch(page);
        }

    }, [])


    function triggerUserFeedsFetch(pageNo) {
        history.push({ search: "?" + new URLSearchParams({ page: pageNo }).toString() })
        setFeedsLoading(true);
        fetchUserFeeds(pageNo)
            .then((data) => {
                setUserFeeds(data.rows);
                let maxPageCount = Math.ceil((data.count) / 10);
                setMaximumPage(maxPageCount);
                setFeedsLoading(false);
            })
            .catch((err) => {
                setFeedsLoading(false);
            })
    }

    function handleFetchPrevFeeds() {
        let pageNo = page - 1;
        setPage(pageNo);
        triggerUserFeedsFetch(pageNo);
    }

    function handleFetchNextFeeds() {
        let pageNo = page + 1;
        setPage(pageNo);
        triggerUserFeedsFetch(pageNo);
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
