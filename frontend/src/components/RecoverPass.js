import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Container, Row, Form, FormControl, Col, Button ,InputGroup} from 'react-bootstrap'
import { FaEyeSlash } from 'react-icons/fa';
import { NavLink, useHistory} from 'react-router-dom';

const RecoverPass = () => {
    const history = useHistory();
    const [user, setUser] = useState({
                code: "", password: "", cpassword: "",
    });

    useEffect(() => { }, [user]);

    const handleInputs = (e) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value });
    };
    //console.log(user);
   const submitButton = async () => {
       //alert("submit");
       //e.preventDefault();
       let emailAddress = localStorage.getItem("emailAddress");
       const   {code , password , cpassword} =user;
       console.log(user);

       const res = await fetch("/recoverpass", {
           method : "POST",
           headers :{
               "Content-Type" : "application/json",
               'Accept': 'application/json'
           },
           body : JSON.stringify({
        code , password , cpassword,emailAddress
           })
       });
  
       const data = await res.json();
       console.log(data);
       if(data.statusText == 'Success'){
           window.alert( 'Password changed successfully');
           history.push('/login');
       }
       else{
           window.alert("Invalid OTP");
       }



    //console.log(user);
    // let url = 'http://localhost:3001/recoverpass'
    // let options = {
    //     method : 'POST',
    //     url:url,
    //     data: user
    // }
    // //console.log("vyvffvv")
    //     let response = await axios (options)
    //     console.log("yhv");
    //     if(response.data.statusText == 'Success'){
    //         window.alert('Password changed successfully');
    //         history.push("/login");
    //     } else{
    //         window.alert("invalid details");
    //     }
    // }catch(e){
    //     window.alert("Something went wrong");
    // }
  
   }


    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="5">
                        <h1>Recover Password</h1>
                        <hr /><br />
                        <Form method='POST'>
                        <Form.Control type="text" name='code' value = {user.code} onChange={handleInputs} placeholder="Verification Code" />

                        <br />

                        <InputGroup className="mb-2">
                            <Form.Control type="password" name='password'  value = {user.password} onChange={handleInputs} placeholder="New Password" />
                            <InputGroup.Text><FaEyeSlash /></InputGroup.Text>
                        </InputGroup>
                        <br />
                        <InputGroup className="mb-2">
                            <Form.Control type="password" name='cpassword'  value = {user.cpassword} onChange={handleInputs} placeholder="Confirm Password" />
                            <InputGroup.Text><FaEyeSlash /></InputGroup.Text>
                        </InputGroup>
                     <NavLink to="/login"> <Button variant="primary" type="submit" className='px-3 py-2 my-2' style={{ fontSize: "20px" }} onClick={submitButton}>
                            Submit
                        </Button></NavLink>
                       <NavLink to = "/resetpass"> <Button variant="dark" type="submit" className='px-3 py-2 my-2 mx-4' style={{ fontSize: "20px" }}>
                            Back
                        </Button></NavLink>
                        </Form>
                    </Col>
                    
                </Row>
            </Container>
        </>
    )
}

export default RecoverPass
