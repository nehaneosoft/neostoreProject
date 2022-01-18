import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { FaGooglePlusG } from 'react-icons/fa';
import { NavLink, useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        firstName: "", lastName: "", emailAddress: "", password: "", cpassword: "", phoneNumber: "", gender: ""
    });

    useEffect(() => { }, [user]);

    const handleInputs = (e) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value });
    };
    console.log(user);


//sending data to db
 const PostDataBackend = async (e) => {
     e.preventDefault();

     const { firstName , lastName , emailAddress , password , cpassword , phoneNumber , gender } =user;

     const res = await fetch("/register", {
         method : "POST",
         headers :{
             "Content-Type" : "application/json",
             'Accept': 'application/json'
         },
         body : JSON.stringify({
            firstName , lastName , emailAddress , password , cpassword , phoneNumber , gender
         })
     });

     const data = await res.json();
     if(data.status === 422 || !data){
         window.alert("Invalid Registration");
         //console.log("Invalid Registration");
     }
     else{
         window.alert("Registration successful");
         //console.log("Registration successful");

         history.push("/login");
     }


 }


    return (
        <>

            <Container className='py-5' style={{ fontSize: "20px" }}>
                <div className='col-md-8 mx-auto'>
                    <Button variant="danger" type="submit" className='px-3 py-3' style={{ fontWeight: "bold" }}>
                        <FaGooglePlusG fontSize="40px" className='pr-1' />
                        Login with Google
                    </Button><hr />
                    <h3 style={{ color: "blue" }}>Register to NeoSTORE</h3>
                    <Form   method='POST'>
                        <Form.Group className="mb-3" controlId="formBasicFname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name='firstName' value={user.firstName} onChange={handleInputs} placeholder="First Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name='lastName' value={user.lastName} onChange={handleInputs} placeholder="Last Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='emailAddress' value={user.emailAddress} onChange={handleInputs} placeholder="Enter email" />
                            {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicMobileno">
                            <Form.Label >Mobile Number</Form.Label>
                            <Form.Control type="number" name='phoneNumber' value={user.phoneNumber} onChange={handleInputs} placeholder="Mobile Number" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicGender">
                            <Form.Label className='pr-3' >Gender  :</Form.Label>
                            <Form.Check type="radio" inline label="Male" name='gender' value="male"  onChange={handleInputs} />
                            <Form.Check type="radio" inline label="Female" name='gender' value="female" onChange={handleInputs} />
                        </Form.Group>
                        

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' value={user.password} onChange={handleInputs} placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name='cpassword' value={user.cpassword} onChange={handleInputs} placeholder="Confirm Password" />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Show Password" />
                        </Form.Group> */}

                        
                        <Button variant="success" type="submit" name='signup' id='signup' className='px-3 py-2' style={{ fontSize: "20px" }} onClick={PostDataBackend}>
                            Register
                        </Button>

                        </Form>

                        <br />
                        <div>
                            <br /> <h4>Already Registered ? <NavLink to='/login'>Login here</NavLink></h4>
                        </div>
                    
                </div>
            </Container>
        </>
    )
}

export default Register
