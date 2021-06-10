import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import RssSiteFeed from '../RssSites/RssSiteFeed';
import {Link, useLocation} from "react-router-dom";
import { fetchRssSiteFeeds } from './fetchRssSiteFeed';
import { CardColumns } from 'react-bootstrap';

function Feed() {
    const history = useHistory();
    const [rssSiteFeeds, setRssSiteFeeds] = useState([]);
    const location = useLocation();
    const rssFeedUrl = location.state.rssFeedUrl;
    
    useEffect(() => {
        let isSubscribed = true
        if(!rssFeedUrl){
            history.push("/home");
        }
        fetchRssSiteFeeds(rssFeedUrl)
        .then((data) => {
            if (isSubscribed) {
            setRssSiteFeeds(data);
            }
        })
        return () =>isSubscribed = false
    }, [])
    return (
        <div>
            {rssSiteFeeds.map((rssSiteFeed, index) => (
            <CardColumns key={index}>
                <RssSiteFeed
                title = {rssSiteFeed.title}
                description = {rssSiteFeed.description}
                link = {rssSiteFeed.link}
                summary = {rssSiteFeed.summary}
                ></RssSiteFeed>
            </CardColumns>
            ))}
        </div>
    )
}

export default Feed
