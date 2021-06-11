import React, { useEffect, useState } from 'react'
import { Col, Jumbotron, Row } from 'react-bootstrap'
import RssSite from '../RssSites/RssSite'
import { useHistory } from 'react-router-dom';
import { fetchRssSites } from '../../Services/fetchRssSite';


function Discover() {
    const history = useHistory();
    const [rssSites, setRssSites] = useState([]);
    useEffect(() => {
        fetchRssSites()
        .then((data) => {
            setRssSites(data);
        })
    }, [])
    return (
        <div>
            <Jumbotron className="text-center">
                Discover Rss Sites
            </Jumbotron>
            
            <div className="text-center">
           <Row xs={1} md={2} className="g-4">
               {rssSites.map((rssSite, index) => (
                   <Col key={index}>
                    <RssSite 
                    title={rssSite.title} 
                    description={rssSite.description} 
                    imageUrl={rssSite.imageUrl}
                    url={rssSite.url}
                    >   
                    </RssSite>
                   </Col>
               ))}
               </Row>
           </div>
        </div>
    )
}

export default Discover
