import React from 'react'
import { Button, Jumbotron, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

function HomePage() {
    const history = useHistory();
    return (
        <div className="text-center">
            <Jumbotron>
                <h1>Welcome to Rss Reader App</h1>
            </Jumbotron>
            <Container fluid="sm">
            <div>
                <Button variant="success" size="lg" active onClick={() => history.push('/login')}>
                    Let's Get Started !!
                </Button>
            </div>
            </Container>
        </div>
    )
}

export default HomePage
