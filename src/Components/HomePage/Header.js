import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();
    return (
        <div>
            <Navbar collapseOnSelect fixed="top" expand="sm" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Rss Reader</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => history.push('/')} >Home</Nav.Link>
                            <Nav.Link onClick={() => history.push('/login')}>Login</Nav.Link>
                            <Nav.Link onClick={() => history.push('/signup')}>SignUp</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
