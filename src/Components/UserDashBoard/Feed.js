import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import RssSiteFeed from '../RssSites/RssSiteFeed';
import {useLocation} from "react-router-dom";
import { fetchRssSiteFeeds } from '../../Services/fetchRssSiteFeed';
import { CardColumns, Spinner } from 'react-bootstrap';

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
        <div>
            {feedsloading && 
                <div className="text-center mt-5">
                    <Spinner animation="border" /><span>Fetching your feed</span>
                    </div>
            }
        {rssSiteFeeds &&             
            rssSiteFeeds.map((rssSiteFeed, index) => (
            <CardColumns key={index}>
                <RssSiteFeed
                title = {rssSiteFeed.title}
                description = {rssSiteFeed.description}
                link = {rssSiteFeed.link}
                summary = {rssSiteFeed.summary}
                ></RssSiteFeed>
            </CardColumns>
            ))
            }
            </div>
    )
}

export default Feed
