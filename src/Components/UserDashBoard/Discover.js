import React, { useEffect, useState } from 'react'
import { Col, Jumbotron, Row, Spinner } from 'react-bootstrap'
import RssSite from '../RssSites/RssSite'
import { useHistory } from 'react-router-dom';
import { fetchRssSites } from '../../Services/fetchRssSite';


function Discover() {
    const history = useHistory();
    const [rssSites, setRssSites] = useState([]);
    const [rssSitesloading, setRssSitesLoading] = useState(true);
    useEffect(() => {
        setRssSitesLoading(true);
        fetchRssSites()
        .then((data) => {
            setRssSites(data);
            setRssSitesLoading(false);
        })
        .catch((err) =>{
            
        })
    }, [])
    return (
        <div>
            <Jumbotron className="text-center">
                Discover Rss Sites
            </Jumbotron>

            {rssSitesloading && 
                <div className="text-center mt-5">
                    <Spinner animation="border" /><span>Fetching Rss Sites</span>
                    </div>
            }
            
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
