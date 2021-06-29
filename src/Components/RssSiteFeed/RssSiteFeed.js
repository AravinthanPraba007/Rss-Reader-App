import React from 'react'
import { Button, Card } from 'react-bootstrap'
import './index.css';
function RssSiteFeed(props) {
    const markup=()=>{return{ __html: props.description}}
    return (
        <div className="text-center">
            <Card>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <div>
                    <Card.Text dangerouslySetInnerHTML={markup()}>
                    </Card.Text>
                    </div>
                    {/* <Card.Text>
                        <div dangerouslySetInnerHTML={markup()}></div>
                        {props.description}
                    </Card.Text> */}
                    <a href={props.link} target="_blank">
                    <Button variant="primary">Vist the Feed</Button></a>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RssSiteFeed
