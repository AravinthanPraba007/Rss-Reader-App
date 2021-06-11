import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { login } from '../../Services/performLogin';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

function Login() {
    const history = useHistory();
    const initalLoginInput = {email : '', password : ''};
    const [loginInput, setLoginInput] = useState(initalLoginInput);
    const [userAuthenticated, setUserAuthenticated] = useContext(AuthContext);

    function handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        setLoginInput({...loginInput, [key]: value});
    }

    function handleLoginSubmit(event) {
        event.preventDefault();
        login(loginInput)
        .then(() => {
            history.push('/home');
            setUserAuthenticated(true);
        })
        .catch(() => {
            
        })
    }

    return (
        <div>
            <h3>Login</h3>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleInputChange} value = {loginInput.email}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleInputChange} value = {loginInput.password} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleLoginSubmit}>
                    Submit
                </Button>
                <p>Need an account <Link to="/signup">Register</Link> </p>
                    
            </Form>
        </div>
    )
}

export default Login
