import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import RssSiteFeed from '../RssSiteFeed/RssSiteFeed';
import {useLocation} from "react-router-dom";
import { fetchSiteFeedsByRssUrl } from '../../Services/feedService';
import { Col, Row, Spinner, Container } from 'react-bootstrap';

function Feeds() {
    const history = useHistory();
    const [rssSiteFeeds, setRssSiteFeeds] = useState([]);
    const [feedsloading, setFeedsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let rssSiteUrlparams = params.get('rssSiteUrl');
    let rssSiteUrl;
    if(rssSiteUrlparams) {
        rssSiteUrl = rssSiteUrlparams;
    }
    
    useEffect(() => {
        let isSubscribed = true
        if(!rssSiteUrl){
            isSubscribed = false;
            history.push("/home");
        }
        setErrorMessage('');
        setFeedsLoading(true);
        fetchSiteFeedsByRssUrl(rssSiteUrl)
        .then((data) => {
            if (isSubscribed) {
            setRssSiteFeeds(data);
            setFeedsLoading(false);
            }
            
        })
        .catch((error) => {
           setErrorMessage("Something went wrong");
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
            {errorMessage && <h4 className="text-center">{errorMessage}</h4>}
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

export default Feeds
