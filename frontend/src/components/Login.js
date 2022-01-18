import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { FaGooglePlusG } from 'react-icons/fa';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../reducer/UserContext';
import { useContext } from 'react';
import GoogleLogin from 'react-google-login';

const Login = () => {

    const { state, dispatch } = useContext(UserContext);

    const history = useHistory();
    const [emailAddress, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState({});
    const [passErr, setPassErr] = useState({});

    useEffect(() => { }, [emailAddress, password]);
    // console.log(emailAddress);
    // console.log(password);


    const loginUser = async (e) => {
        e.preventDefault();
        localStorage.setItem("emailAddress", emailAddress);

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                emailAddress, password
            })
        });
        const data = res.json();
        if (res.status === 400 || !data) {
            window.alert("Invalid credentials");
        }
        else {
            dispatch({ type: "USER", payload: true })
            window.alert("Login successful");
            history.push('/');
        }
        //   console.log(emailAddress);
        //   console.log(password);
        setEmail("");
        setPassword("")

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();
    }
    const formValidation = () => {

        const emailErr = {};
        const passErr = {};
        let isValid = true;

        if (!emailAddress.includes('.')) {
            emailErr.emailAddress = "Provide Valid Email Id containing .";
            isValid = false;
        }

        if (!emailAddress.includes('@')) {
            emailErr.Email = "Enter a valid Email Id containing @";
            isValid = false;
        }

        if (emailAddress.trim().length <= 0) {
            emailErr.Email = "Please Provide Email Id";
            isValid = false;
        }

        if (password.trim().length <= 4) {
            passErr.Password = "Password should be of length 5 or more"
            isValid = false;
        }

        if (password.trim().length <= 0) {
            passErr.Password = "Enter a strong password";
            isValid = false;
        }

        setEmailErr(emailErr);
        setPassErr(passErr);
        return isValid;
    }
    //google login

    const responseSuccessGoogle = (response) => {
        console.log(response);
    }

    const responseErrorGoogle = (response) => {
        console.log(response);
    }


    return (
        <>

            <Container className='py-5'>
                <div className='col-md-8 mx-auto'>
                    <h3 style={{ color: "blue" }}>Login to NeoSTORE</h3>
                    <hr />
                    <Form method='POST' style={{ width: "70%", fontSize: "20px" }} onSubmit={onSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='emailAddress' value={emailAddress} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                            {Object.keys(emailErr).map((key) => {
                                return (
                                    <div style={{ color: "red" }}>
                                        {emailErr[key]}
                                    </div>
                                )
                            })}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Show Password" />
                        </Form.Group> */}
                        <Button variant="success" type="submit" name='signin' id='signin' onClick={loginUser} className='mx-5 px-3 py-3' style={{ fontSize: "20px" }}>
                            Login
                        </Button>
                        <GoogleLogin
                            clientId="1016208721638-9pnnnj5mm261ansamt0pfjb77unrj2fc.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        {/* <Button variant="danger" type="submit" className='px-3 py-3' style={{ fontSize: "20px" }}>
                            <FaGooglePlusG fontSize="35px" /> Login using google
                        </Button> */}
                    </Form>
                    <br />
                    <br />
                    <h4><NavLink to="/register"> Register Now </NavLink>| <NavLink to="/resetpass"> Forgotten ?</NavLink></h4>
                </div>
            </Container>
        </>
    )

}
export default Login
