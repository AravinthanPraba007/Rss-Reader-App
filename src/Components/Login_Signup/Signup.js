import React, { useContext, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { signup } from '../../Services/performSignup';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

function Signup() {
    const history = useHistory();
    const initalSignupInput = { name: '', email: '', password: '' };
    const [signupInput, setSignupInput] = useState(initalSignupInput);
    const [userAuthenticated, setUserAuthenticated] = useContext(AuthContext);
    const [signupTriggered, setSignupTriggered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        setSignupInput({ ...signupInput, [key]: value });
    }

    function handleValidation() {
        let validationPassed = true;
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (signupInput.email) {
            let isEmailValid = (signupInput.email).match(mailformat);
            if (!isEmailValid) {
                setErrorMessage("Provide vaild email id");
                validationPassed = false;
            }
        }
        else {
            setErrorMessage("Email id cant be empty");
            validationPassed = false;
        }
        if (signupInput.password == '') {
            setErrorMessage("Password can't be empty");
            validationPassed = false;
        }
        if (signupInput.name == '') {
            setErrorMessage("Name can't be empty");
            validationPassed = false;
        }
        return validationPassed;
    }

    function handleSignupSubmit(event) {
        event.preventDefault();
        let validated = handleValidation();
        if (validated) {
            setSignupTriggered(true);
            signup(signupInput)
                .then((res) => {
                    setUserAuthenticated(true);
                    setSignupTriggered(false);
                    history.push('/home');
                })
                .catch((err) => {
                    setSignupTriggered(true);
                    setErrorMessage(err.data.message);
                })
        }
    }

    return (
        <div>
            <h3>Sign Up</h3>
            {errorMessage &&
                <Alert variant="warning">
                    {errorMessage}
                </Alert>
            }
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter your name" onChange={handleInputChange} value={signupInput.name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" onChange={handleInputChange} value={signupInput.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleInputChange} value={signupInput.password} />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={signupTriggered}
                    onClick={handleSignupSubmit}>
                    Submit
                </Button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </Form>
        </div>
    )
}

export default Signup
