import React from 'react'
import { Button, Form } from 'react-bootstrap'

function Signup() {
    return (
        <div>
            <h3>Sign Up</h3>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ReTypePassword">
                    <Form.Label>Re-Type Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-type the Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Signup
