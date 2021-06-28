import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import RssSiteFeed from '../RssSites/RssSiteFeed';
import { Col, Row, Spinner, Container, Button, Alert } from 'react-bootstrap';
import { fetchSiteFeeds } from '../../Services/fetchFeed';
import {useLocation} from "react-router-dom";
import { manageSubscribe, manageUnsubscribe } from '../../Services/manageSubscription';

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
    let goodToProceed = false;
    
    useEffect(() => {
        let isSubscribed = true
        if((location.state && location.state.rssId && location.state.rssTitle)) {
            setRssId(location.state.rssId);
            setRssTitle(location.state.rssTitle);
            setFromSubscriptionlist(location.state.fromSubscriptionlist);
            goodToProceed = true;
            console.log(location.state);
        }
        if(!goodToProceed){
            history.push("/home");
        }
        else {
            setFeedsLoading(true);
        fetchSiteFeeds(page, location.state.rssId)
        .then((data) => {
            if (isSubscribed) {
                setUserFeeds(data.rows);
                let maxPageCount = Math.ceil((data.count)/10);
                setMaximumPage(maxPageCount);
                setFeedsLoading(false);
            }
        })
        return () =>isSubscribed = false
        }
    }, [])

    function handleFetchPrevFeeds(){
        let pageNo = page-1;
        setPage(pageNo);
        setFeedsLoading(true);
        fetchSiteFeeds(pageNo, rssId)
            .then((data) => {
                setUserFeeds(data.rows);
                setFeedsLoading(false);
            })
    }

    function handleFetchNextFeeds(){
        let pageNo = page+1;
        setPage(pageNo);
        setFeedsLoading(true);
        fetchSiteFeeds(pageNo, rssId)
            .then((data) => {
                setUserFeeds(data.rows);
                setFeedsLoading(false);
            })
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
            <Button className="my-2" disabled = {(page == 1)} variant="success" onClick={() => handleFetchPrevFeeds()}> Prev</Button>
            <span className="mx-3">Page :{page} / {maximumPage}</span>
            <Button className="my-2" disabled = {(page == maximumPage)} variant="success" onClick={() => handleFetchNextFeeds()}> Next</Button>
            </div>
            
        </div>
    )
}

export default SiteFeeds
