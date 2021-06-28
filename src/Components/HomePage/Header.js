import React, { useContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { logout } from '../../Services/performLogout';

function Header() {
    const history = useHistory();
    const [userAuthenticated, setUserAuthenticated] = useContext(AuthContext);
    return (
        <div>
            <Navbar collapseOnSelect fixed="top" expand="sm" bg="light" variant="light">
                <Container>
                    <Navbar.Brand onClick={() => {
                        userAuthenticated? history.push('/home') : history.push('/')}
                    }
                        >Rss Reader</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    {!userAuthenticated &&
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => history.push('/')} >Home</Nav.Link>
                            <Nav.Link onClick={() => history.push('/login')}>Login</Nav.Link>
                            <Nav.Link onClick={() => history.push('/signup')}>SignUp</Nav.Link>
                            </Nav>
                             }
                    {userAuthenticated && 
                    <Nav className="me-auto">
                    <Nav.Link onClick={() => history.push('/home')} >Home</Nav.Link>
                    <Nav.Link onClick={() => history.push('/searchfeed')} >Search</Nav.Link>
                    <Nav.Link onClick={() => history.push('/discover')}>Discover</Nav.Link>
                    <Nav.Link onClick={() => history.push('/subscriptions')}>Subscriptions</Nav.Link>
                    <Nav.Link onClick={() => logout(history, setUserAuthenticated)}>Logout</Nav.Link>
                    </Nav>
                    }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
