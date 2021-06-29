import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import RssSiteFeed from '../RssSiteFeed/RssSiteFeed';
import { Col, Row, Spinner, Container, Button, Alert } from 'react-bootstrap';
import { fetchSiteFeeds } from '../../Services/feedService';
import { useLocation } from "react-router-dom";
import { manageSubscribe, manageUnsubscribe } from '../../Services/subscriptionService';
import { fetchRssSiteDetails } from '../../Services/rssSiteService';

function SiteFeeds(props) {
    const history = useHistory();
    const [userFeeds, setUserFeeds] = useState([]);
    const [feedsloading, setFeedsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [maximumPage, setMaximumPage] = useState(1);
    const [rssId, setRssId] = useState();
    const [rssTitle, setRssTitle] = useState();
    const [subscriptionMessage, setSubscriptionMessage] = useState('');
    const [fromSubscriptionlist, setFromSubscriptionlist] = useState(false);
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        console.log("Query param -> rssId : " + params.get('rssId'));
        let rssIdparams = params.get('rssId');

        if (rssIdparams) {
            setRssId(rssIdparams);
            fetchRssSiteDetails(rssIdparams)
                .then((data) => {
                    setRssId(data.id);
                    setRssTitle(data.title);
                    console.log("Query param -> page : " + params.get('page'));
                    let pageNoParams = params.get('page');
                    if (pageNoParams) {
                        setPage(parseInt(pageNoParams));
                        triggerSiteFeedFetch(pageNoParams, rssIdparams);
                    }
                    else {
                        triggerSiteFeedFetch(page, rssIdparams);
                    }
                })
                .catch((err) => {
                    history.push("/home");
                })

        }
        else {
            history.push("/home");
        }
    }, [])

    function triggerSiteFeedFetch(pageNo, rssId) {
        history.push({ search: "?" + new URLSearchParams({ rssId: rssId, page: pageNo }).toString() })
        setFeedsLoading(true);
        fetchSiteFeeds(pageNo, rssId)
            .then((data) => {
                setUserFeeds(data.rows);
                let maxPageCount = Math.ceil((data.count) / 10);
                setMaximumPage(maxPageCount);
                setFeedsLoading(false);
            })
            .catch((err) => {
                setFeedsLoading(false);
            })
        return () => isSubscribed = false
    }

    function handleFetchPrevFeeds() {
        let pageNo = page - 1;
        setPage(pageNo);
        triggerSiteFeedFetch(pageNo, rssId);
    }

    function handleFetchNextFeeds() {
        let pageNo = page + 1;
        setPage(pageNo);
        triggerSiteFeedFetch(pageNo, rssId);
    }

    function handleSubscribe() {
        manageSubscribe(rssId)
            .then((res) => {
                setSubscriptionMessage(res);
            })
            .catch((error) => {

            })
    }

    return (
        <div className="mt-4">
            <Container fluid="sm">
                {/* <h3 className="text-center">Check out your Recent Feeds</h3> */}
                {feedsloading &&
                    <div className="text-center mt-5">
                        <h3 className="text-center">Check out {rssTitle} Feeds</h3>
                        <Spinner animation="border" /><span>Fetching the feed</span>
                    </div>
                }


                {(userFeeds && userFeeds.length > 0) && <div>
                    <h3 className="text-center">Check out {rssTitle} Feeds</h3>
                    {!fromSubscriptionlist &&
                        <div className="m-3 text-center">
                            {!subscriptionMessage &&
                                <Button className="m-2" variant="success" onClick={() => handleSubscribe()}> Subscribe</Button>
                            }
                            {subscriptionMessage &&
                                <span className="badge bg-success my-2"> {subscriptionMessage} </span>}
                        </div>
                    }
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
                </div>
                }

            </Container>
            <div className="text-center my-3">
                <Button className="my-2" disabled={(page == 1)} variant="success" onClick={() => handleFetchPrevFeeds()}> Prev</Button>
                <span className="mx-3">Page :{page} / {maximumPage}</span>
                <Button className="my-2" disabled={(page == maximumPage)} variant="success" onClick={() => handleFetchNextFeeds()}> Next</Button>
            </div>

        </div>
    )
}

export default SiteFeeds
