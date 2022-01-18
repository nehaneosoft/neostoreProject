import React from 'react';
import { Container, Row, Form, FormControl, Col, Button ,InputGroup} from 'react-bootstrap';
import { FaEyeSlash } from 'react-icons/fa';

const ChangePassword = () => {
    return (
        <>
             <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="5">
                        <h1>Change Password</h1>
                        <hr /><br />
                        <Form.Control type="text" placeholder="Old Password" />

                        <br />

                        <InputGroup className="mb-2">
                            <Form.Control type="text" placeholder="New Password" />
                        </InputGroup>
                        <br />
                        <InputGroup className="mb-2">
                            <Form.Control type="text" placeholder="Confirm Password" />
                        </InputGroup>
                        <Button variant="primary" type="submit" className='px-3 py-2 my-2' style={{ fontSize: "20px" }}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ChangePassword
