import React, { useRef } from 'react';
import { Container, Row, Form, FormControl, Col, Button, InputGroup } from 'react-bootstrap';
import { FaEyeSlash } from 'react-icons/fa';
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ResetPass = () => {
    const history = useHistory();
    const emailRef = useRef();
    const sendOtp = async (e) => {
        e.preventDefault();
        const res = await fetch('/sendEmail', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                emailAddress: emailRef.current.value
            })
        });
        const data = await res.json();
        if (data.statusText === 'Success') {
            window.alert('Email Sent : Please check your Email Id for OTP');
            // toast.success("Success Notification !", {
            //     position: toast.POSITION.TOP_CENTER
            //   });
            history.push('/recoverpass');
        }
        else {
            window.alert('Email Id not exist');
        }

    }



    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="5">
                        <h1>Reset Password</h1>
                        <hr /><br />
                        <Form method='POST'>
                        <Form.Control type="text" name='emailAddress' ref={emailRef} placeholder="Enter Email Address" />

                        <br />
                        <NavLink to="/recoverpass"><Button variant="primary" type="submit" className='px-3 py-2 my-2 mx-2' style={{ fontSize: "20px" }} onClick={sendOtp}>
                            Send OTP
                        </Button></NavLink>
                        <NavLink to="/login"><Button variant="dark" type="submit" className='px-3 py-2 my-2 mx-2' style={{ fontSize: "20px" }}>
                            Back
                        </Button></NavLink>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ResetPass
