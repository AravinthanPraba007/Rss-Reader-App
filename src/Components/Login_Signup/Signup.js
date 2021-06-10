import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { signup } from './performSignup';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

function Signup() {
    const history = useHistory();
    const initalSignupInput = {name: '', email : '', password : ''};
    const [signupInput, setSignupInput] = useState(initalSignupInput);
    const [userAuthenticated, setUserAuthenticated] = useContext(AuthContext);

    function handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        setSignupInput({...signupInput, [key]: value});
    }

    function handleSignupSubmit(event) {
        event.preventDefault();
        signup(signupInput)
        .then(() => {
            history.push('/home');
            setUserAuthenticated(true);
        })
        .catch(() => {
            
        })
    }

    return (
        <div>
            <h3>Sign Up</h3>
            <Form>
            <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter your name" onChange={handleInputChange} value = {signupInput.name}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" onChange={handleInputChange} value = {signupInput.email}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleInputChange} value = {signupInput.password}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSignupSubmit}>
                    Submit
                </Button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </Form>
        </div>
    )
}

export default Signup
