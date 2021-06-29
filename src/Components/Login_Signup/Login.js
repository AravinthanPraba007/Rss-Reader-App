import React, { useContext, useState } from 'react'
import { Alert, Button, Form, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { login, googleLogin } from '../../Services/loginService';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import GoogleLogin from 'react-google-login';

function Login() {
    const history = useHistory();
    const initalLoginInput = { email: '', password: '' };
    const [loginInput, setLoginInput] = useState(initalLoginInput);
    const [loginTriggered, setLoginTriggered] = useState(false);
    const [userAuthenticated, setUserAuthenticated] = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    function handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        setLoginInput({ ...loginInput, [key]: value });
    }
    function handleValidation() {
        let validationPassed = true;
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (loginInput.email) {
            let isEmailValid = (loginInput.email).match(mailformat);
            if (!isEmailValid) {
                setErrorMessage("Provide vaild email id");
                validationPassed = false;
            }
        }
        else {
            setErrorMessage("Email id cant be empty");
            validationPassed = false;
        }
        if (loginInput.password == '') {
            setErrorMessage("Password can't be empty");
            validationPassed = false;
        }
        return validationPassed;
    }

    function handleLoginSubmit(event) {
        event.preventDefault();
        let validated = handleValidation();
        if (validated) {
            setLoginTriggered(true);
            setErrorMessage('');
            login(loginInput)
                .then((res) => {
                    console.log(res);
                    setUserAuthenticated(true);
                    setLoginTriggered(false);
                    history.push('/home');

                })
                .catch((err) => {
                    setLoginTriggered(false);
                    setErrorMessage(err.data.message);
                })
        }


    }

    function handleSuccessGoogleLogin(response) {
        console.log(response);
        console.log(response.tokenObj.access_token);
        setLoginTriggered(true);
            setErrorMessage('');
            googleLogin(response.tokenId)
                .then((res) => {
                    console.log(res);
                    setUserAuthenticated(true);
                    setLoginTriggered(false);
                    history.push('/home');

                })
                .catch((err) => {
                    setLoginTriggered(false);
                    setErrorMessage(err.data.message);
                })

    }

    function handleErrorGoogleLogin(response) {
        console.log(response);
        setErrorMessage("Google Login Failed");
    }

    return (
        <div className="mt-5">
            <Container fluid="sm">
                <h3>Login</h3>
                {errorMessage &&
                    <Alert variant="warning">
                        {errorMessage}
                    </Alert>
                }
                <Form noValidate onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" required placeholder="Enter email" onChange={handleInputChange} value={loginInput.email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required placeholder="Password" onChange={handleInputChange} value={loginInput.password} />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loginTriggered}
                    >
                        Login
                    </Button>
                    <p>Need an account <Link to="/signup">Register</Link> </p>
                    

                </Form>
                <div className="m-3 text-center">
                    <GoogleLogin
                        clientId={process.env.GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        onSuccess={handleSuccessGoogleLogin}
                        onFailure={handleErrorGoogleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                    </div>
            </Container>
        </div>
    )
}

export default Login
