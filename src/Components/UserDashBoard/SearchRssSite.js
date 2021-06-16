import React, { useState } from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { searchRssSite } from '../../Services/searchRssSite';
import RssSite from '../RssSites/RssSite';

function SearchRssSite() {

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
                    setErrorMessage(err.data.message);
                    
                })
        }


    }



    return (
        <div>

            <Form noValidate onSubmit={handleSearch}>
                <Form.Group className="mb-3" controlId="rssFeedUrl">
                    <Form.Label>
                        <h3>Search your favorite Rss Site</h3>
                    </Form.Label>
                    {errorMessage &&
                        <Alert variant="warning">
                            {errorMessage}
                        </Alert>
                    }
                    <Form.Control type="text" onChange={handleInputChange} placeholder="Enter the Rss Site URL" value={searchInput.rssFeedUrl} />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={searchTriggered}
                >
                    Search
                </Button>
            </Form>


            {searchTriggered &&
                <div className="text-center mt-5">
                    <Spinner animation="border" /><span>Fetching the Rss Site</span>
                </div>
            }

            {rssSite.isloaded && 
                <div className="text-center mt-3">
                <RssSite 
                title={rssSite.title} 
                description={rssSite.description} 
                imageUrl={rssSite.imageUrl}
                url={rssSite.url}
                >   
                </RssSite>
                </div>
            }
            

        </div>
    )
}

export default SearchRssSite
