import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import RssSiteFeed from '../RssSites/RssSiteFeed';
import {useLocation} from "react-router-dom";
import { fetchRssSiteFeeds } from '../../Services/fetchRssSiteFeed';
import { Col, Row, Spinner, Container } from 'react-bootstrap';

function Feed() {
    const history = useHistory();
    const [rssSiteFeeds, setRssSiteFeeds] = useState([]);
    const [feedsloading, setFeedsLoading] = useState(true);
    const location = useLocation();
    let rssFeedUrl;
    if(location.state && location.state.rssFeedUrl) {
        rssFeedUrl = location.state.rssFeedUrl;
    }
    useEffect(() => {
        let isSubscribed = true
        if(!rssFeedUrl){
            history.push("/home");
        }
        setFeedsLoading(true);
        fetchRssSiteFeeds(rssFeedUrl)
        .then((data) => {
            if (isSubscribed) {
            setRssSiteFeeds(data);
            }
            setFeedsLoading(false);
        })
        return () =>isSubscribed = false
    }, [])
    return (
        <div className="mt-4">
             <Container fluid="sm">
            {feedsloading && 
                <div className="text-center mt-5">
                    <Spinner animation="border" /><span>Fetching your feed</span>
                    </div>
            }
            <Row xs={1} sm={1} md={2} lg={3} >
        {rssSiteFeeds &&             
            rssSiteFeeds.map((rssSiteFeed, index) => (
                <Col  key={index} className="mb-4">
                <RssSiteFeed
                title = {rssSiteFeed.title}
                description = {rssSiteFeed.description}
                link = {rssSiteFeed.link}
                summary = {rssSiteFeed.summary}
                ></RssSiteFeed>
            </Col>
            ))
            }
            </Row>
            </Container>
            </div>
    )
}

export default Feed
