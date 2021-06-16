import React, { useEffect, useState } from 'react'
import { Col, Jumbotron, Row, Spinner, Container } from 'react-bootstrap'
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
            <Container fluid="sm">
            {rssSitesloading && 
                <div className="text-center mt-5">
                    <Spinner animation="border" /><span>Fetching Rss Sites</span>
                    </div>
            }
            
            <div className="text-center">
               
           <Row xs={1} sm={1} md={2} lg={3} >
               {rssSites.map((rssSite, index) => (
                   <Col  key={index} className="mb-4">
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
           </Container>
        </div>
    )
}

export default Discover
