import React from 'react'
import { Button, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import UserRecentFeeds from '../UserRecentFeeds/UserRecentFeeds';
function UserDashboard() {
    const history = useHistory();
    return (
        <div className="mb-5">
            <div className="text-center">
                <Jumbotron>
                    <h1>Welcome to Rss Reader App</h1>
                </Jumbotron>
            </div>
            <div className="text-center">
                <div>
                    <Container fluid="sm">
                        <Row  xs={1} sm={1} md={1} lg={2} className="justify-content-md-center">
                            <Col className="mb-3">
                                <Button variant="info" size="lg" active onClick={() => history.push('/subscriptions')}>
                                    Manage your Feed Sites Subscription!!
                                </Button>
                            </Col>
                            <Col className="mb-3">
                                <Button variant="success" size="lg" active onClick={() => history.push('/discover')}>
                                    Want to explore Feed Sites!!
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                </div>



               
            </div>
            <div>
                <UserRecentFeeds></UserRecentFeeds>
            </div>
        </div>
    )
}

export default UserDashboard
