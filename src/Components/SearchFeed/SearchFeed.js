import React, { useState, useEffect } from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container, Jumbotron } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router';
import { searchFeeds } from '../../Services/searchFeeds';
import RssSiteFeed from '../RssSites/RssSiteFeed';

function SearchFeed(props) {

    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const initalSearchInput = { searchText: '' };
    const initalFeedData = { isloaded: false, feedsData: [] }
    const [searchInput, setSearchInput] = useState(initalSearchInput);
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [feeds, setFeeds] = useState(initalFeedData);

    function handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        setSearchInput({ ...searchInput, [key]: value });
    }

    function triggerSearch(searchText) {
        setSearchTriggered(true);
            setErrorMessage('');
            setFeeds({ isloaded: false });
            searchFeeds(searchText)
                .then((res) => {
                    console.log(res);
                    setSearchTriggered(false);
                    res.isloaded = true;
                    res.feedsData = res
                    setFeeds(res);
                })
                .catch((err) => {
                    setSearchTriggered(false);
                    setErrorMessage("Search error : " + err.data.message);
                })
    }


    function handleSearch(event) {
        event.preventDefault();
        history.push({search: "?" + new URLSearchParams({searchText: searchInput.searchText}).toString()})
        if (searchInput.searchText) {
            triggerSearch(searchInput.searchText);
        }
    }

    useEffect(() => {
        console.log("Query param -> searchText : " + params.get('searchText'));
        let searchTextparams = params.get('searchText');
        if(params.get('searchText')) {
            setSearchInput({ ...searchInput, ['searchText']: searchTextparams});
            triggerSearch(searchTextparams);
        }
    }, [])

    return (
        <div>
            <Jumbotron className="text-center">
                Search Feeds
            </Jumbotron>
            <div className="my-4 text-center">
                <Container fluid="sm">
                    <Form noValidate onSubmit={handleSearch}>

                        <Row xs={1} sm={1} md={2} lg={2}>
                            <Col lg="10" md="10">
                                <Form.Group className="mb-3" controlId="searchText">
                                    <Form.Control type="text" onChange={handleInputChange} placeholder="Enter the feed keyword" value={searchInput.searchText} />
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
                            <Spinner animation="border" /><span>Searching the feeds</span>
                        </div>
                    }

                    {feeds.isloaded &&
                        <div className="mt-3">
                            {(feeds.feedsData.length > 0) ?
                                <div>
                                    <h6>Search Result</h6>
                                    <Row xs={1} sm={1} md={2} lg={3} >
                                        { feeds.feedsData.map((feed, index) => (
                                                <Col key={index} className="mb-4">
                                                    <RssSiteFeed
                                                        title={feed.title}
                                                        description={feed.description}
                                                        link={feed.link}
                                                        summary={feed.summary}
                                                    ></RssSiteFeed>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </div>
                                :
                                <div>No Search data matched </div>
                            }
                        </div>
                    }
                </Container>
            </div>
        </div>
    )
}

export default SearchFeed
