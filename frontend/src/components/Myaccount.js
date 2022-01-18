import React,{useEffect,useState} from 'react'
import { Container , Row, Col, Button} from 'react-bootstrap'
import profilepic from '../Images/girl.jpg';
import { HiMenuAlt2 } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import {FaAddressBook} from "react-icons/fa";
import {FaExchangeAlt} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import { NavLink,useHistory } from 'react-router-dom';
import { UserContext } from '../reducer/UserContext';
import {useContext} from 'react';

const Myaccount = () => {
    const {state, dispatch} = useContext(UserContext);

    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAccountPage = async () =>{

        try{
            const res = await fetch('/account',{
                method : "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);
            //console.log(userData);

            dispatch({type:"USER", payload:true})
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }


        } catch (err) {
            console.log(err);
            history.push('/login');

        }

    }



    useEffect (() => {
        callAccountPage();

    }, []);

    //
    // var profileBtn = document.getElementById("profile");
    // function prof () {
    //     profileBtn.style.color = "green";
    // }

    return (
        <div>
            <Container>
        
            <h2 className='text-left'>My Account</h2>
                    <hr />
                <form method='GET'>
                
                <Row  className="d-flex justify-content-md-center text-center font-size" style={{fontSize:"17px"}}>
                    <Col xs={4} >
                    <br />
                    <img src={profilepic} alt='dp' className="rounded-circle"/><br />
                    <h4>{userData.firstName} {userData.lastName}</h4><br/>
                    <NavLink to="#" className='font-weight-bold'>
                        <HiMenuAlt2 className='mr-2'/>
                        Order</NavLink><br /><br />

                    <NavLink to="/profile" className='font-weight-bold'> <HiUser className='mr-2'/>Profile</NavLink><br /><br />

                    <NavLink to="/shippingAddress" className='font-weight-bold'><FaAddressBook className='mr-2'/>Address</NavLink><br /><br />
                    <NavLink to="/changepass"className='font-weight-bold'>< FaExchangeAlt className='mr-2'/>Change Password</NavLink><br /><br />

                    </Col>
            
                    <Col xs={8}>
                        <br />
                    <h3 className='text-left'>Profile</h3>
                    <hr />

                    <Row className='text-left font-weight-bold mt-3'>
                        <Col xs={4}>
                        <label>First Name</label>
                        </Col>
                        <Col xs={4}>
                            <p>{userData.firstName}</p>
                        </Col>
                    </Row>

                    <Row className='text-left font-weight-bold mt-3'>
                        <Col xs={4}>
                        <label>Last Name</label>
                        </Col>
                        <Col xs={4}>
                            <p>{userData.lastName}</p>
                        </Col>
                    </Row>

                    <Row className='text-left font-weight-bold mt-3'>
                        <Col xs={4}>
                        <label>Gender</label>
                        </Col>
                        <Col xs={4}>
                            <p>{userData.gender}</p>
                        </Col>
                    </Row>

                    <Row className='text-left font-weight-bold mt-3'>
                        <Col xs={4}>
                        <label>Mobile Number</label>
                        </Col>
                        <Col xs={4}>
                            <p>{userData.phoneNumber}</p>
                        </Col>
                    </Row>
                    
                    <Row className='text-left font-weight-bold mt-3'>
                        <Col xs={4}>
                        <label>Email</label>
                        </Col>
                        <Col xs={4}>
                            <p>{userData.emailAddress}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row className='text-left '>
                        <Col xs={4}>
                      <NavLink to= {`/${userData._id}` }><Button variant='outline-secondary'className='font-weight-bold my-3'> <MdEdit className='mr-2'/>Edit</Button></NavLink>
                        </Col>
                    </Row>
                    <hr color='black'/>
                    
                    

                    </Col>
                    <hr />
                </Row>
                </form>
            </Container>
        </div>
    )
}

export default Myaccount
