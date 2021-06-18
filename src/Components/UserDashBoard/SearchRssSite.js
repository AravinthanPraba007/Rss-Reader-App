import React, { useState } from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { searchRssSite } from '../../Services/searchRssSite';
import RssSite from '../RssSites/RssSite';

function    SearchRssSite() {

    const history = useHistory();
    const initalSearchInput = { rssFeedUrl: '' };
    const [searchInput, setSearchInput] = useState(initalSearchInput);
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [rssSite, setRssSite] = useState({isloaded: false});

    function handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        setSearchInput({ ...searchInput, [key]: value });
    }

    function handleValidation() {
        let validationPassed = true;
        let urlformat = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i');
        if (searchInput.rssFeedUrl) {
            let isUrlValid = urlformat.test(searchInput.rssFeedUrl);
            if (!isUrlValid) {
                setErrorMessage("Provide vaild Rss site URl");
                validationPassed = false;
            }
        }
        else {
            setErrorMessage("Search URl cant be empty");
            validationPassed = false;
        }

        return validationPassed;
    }

    function handleSearch(event) {
        event.preventDefault();
        let validated = handleValidation();
        if (validated) {
            setSearchTriggered(true);
            setErrorMessage('');
            setRssSite({isloaded: false});
            searchRssSite(searchInput.rssFeedUrl)
                .then((res) => {
                    console.log(res);
                    setSearchTriggered(false);
                    res.isloaded = true;
                    res.url = searchInput.rssFeedUrl;
                    setRssSite(res);
                    
                })
                .catch((err) => {
                    setSearchTriggered(false);
                    setErrorMessage("Search error : "+err.data.message);
                    
                })
        }


    }



    return (
        <div>
            <Container fluid="sm">
            <Form noValidate onSubmit={handleSearch}>
            
                <Row xs={1} sm={1} md={2} lg={2}>
                    <Col lg="10" md="10">
                <Form.Group className="mb-3" controlId="rssFeedUrl">
                    {/* <Form.Label>
                        <h4>Search your favorite Rss Site</h4>
                    </Form.Label> */}
                    
                    <Form.Control type="text" onChange={handleInputChange} placeholder="Enter the Rss Site URL" value={searchInput.rssFeedUrl} />
                </Form.Group>
                </Col>
                <Col lg="2" md="1">
                <Button
                    variant="primary"
                    type="submit"
                    disabled={searchTriggered}
                >
                    Search
                </Button>
                </Col>
                </Row>
            </Form>
            {errorMessage &&
                        <Alert className="mt-3" variant="warning">
                            {errorMessage}
                        </Alert>
                    }

            {searchTriggered &&
                <div className="text-center mt-5">
                    <Spinner animation="border" /><span>Fetching the Rss Site</span>
                </div>
            }

            {rssSite.isloaded && 
                <div className="text-center my-3">
                    <h6>Search Result</h6>
                <RssSite 
                title={rssSite.title} 
                description={rssSite.description} 
                imageUrl={rssSite.imageUrl}
                url={rssSite.url}
                >   
                </RssSite>
                </div>
            }
            </Container>

        </div>
    )
}

export default SearchRssSite
