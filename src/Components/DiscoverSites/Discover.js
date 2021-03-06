import React, { useEffect, useState } from 'react'
import { Col, Jumbotron, Row, Spinner, Container } from 'react-bootstrap'
import RssSite from '../RssSite/RssSite'
import { useHistory } from 'react-router-dom';
import { fetchAvailableRssSites } from '../../Services/rssSiteService';
import SearchRssSite from '../SearchRssSite/SearchRssSite';

function DiscoverSites() {
    const history = useHistory();
    const [rssSites, setRssSites] = useState([]);
    const [rssSitesloading, setRssSitesLoading] = useState(true);
    useEffect(() => {
        setRssSitesLoading(true);
        fetchAvailableRssSites()
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
            
            <div className="my-4 text-center">
                    <SearchRssSite></SearchRssSite>
            </div>
            <Container fluid="sm">
            {rssSitesloading && 
                <div className="text-center mt-5">
                    <Spinner animation="border" /><span>Fetching Rss Sites</span>
                    </div>
            }
            
            {!rssSitesloading && 
            <div className="text-center">
               <h4>Available Rss Sites</h4>
           <Row xs={1} sm={1} md={2} lg={3} className="mt-3" >
               {rssSites.map((rssSite, index) => (
                   <Col  key={index} className="mb-4">
                    <RssSite 
                    id={rssSite.id}
                    title={rssSite.title} 
                    description={rssSite.description} 
                    imageUrl={rssSite.imageUrl}
                    url={rssSite.url}
                    rssId ={rssSite.id}
                    fromDiscoverlist = "true"
                    >   
                    </RssSite>
                   </Col>
               ))}
               </Row>
           </div>
}
           </Container>
        </div>
    )
}

export default DiscoverSites
