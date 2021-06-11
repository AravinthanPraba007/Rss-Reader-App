import React from 'react'
import { CardColumns } from 'react-bootstrap'
import RssSiteFeed from './RssSiteFeed'

function RssSiteFeedList(rssSiteFeeds) {
    console.log(rssSiteFeeds);
    return (
        <div>
            {rssSiteFeeds.map((rssSiteFeed, index) => (
            <CardColumns key={index}>
                <RssSiteFeed
                title = {rssSiteFeed.title}
                description = {rssSiteFeed.description}
                link = {rssSiteFeed.link}
                summary = {rssSiteFeed.summary}
                >
                </RssSiteFeed>
            </CardColumns>
            ))}
        </div>
    )
}

export default RssSiteFeedList
