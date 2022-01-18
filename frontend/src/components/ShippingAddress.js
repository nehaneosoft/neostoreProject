import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button,Card } from 'react-bootstrap'
import profilepic from '../Images/girl.jpg';
import { HiMenuAlt2 } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { FaAddressBook } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../reducer/UserContext';
import { useContext } from 'react';

const ShippingAddress = () => {
    //getting user data
    // const userId = props.match.params.userId;

    // const [details, setDetails] = useState([]);

    // const getUserDetails = async() => {
    //     try{
    //         const res = await fetch (`/user_by_id?id=${userId}`);
    //         const data = await res.json();
    //         setDetails(data[0]);

    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    // useEffect(() => {
    //     getUserDetails();
    // }, [])


    //const {state, dispatch} = useContext(UserContext);

    const history = useHistory();
    const [userData, setUserData] = useState({});
    // const [add,setAdd] = useState({})

    const callAccountPage = async () => {

        try {
            const res = await fetch('/account', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        callAccountPage();

    }, []);


    const orderPlaced = () => {
        alert("Order is placed and will be delivered to the selected address.")
        history.push("/orderplaced");
    }
    // setAdd(userData.deliveryAddress)
    

    return (
        <div>
            <Container>

                <h2 className='text-left'>My Account</h2>
                <hr />
                <form method='GET'>

                    <Row className="d-flex justify-content-md-center text-center font-size" style={{ fontSize: "17px" }}>
                        <Col xs={4} >
                            <br />
                            <img src={profilepic} alt='dp' className="rounded-circle" /><br />
                            <h4>{userData.firstName} {userData.lastName}</h4><br />
                            <NavLink to="#" className='font-weight-bold'>
                                <HiMenuAlt2 className='mr-2' />
                                Order</NavLink><br /><br />

                            <NavLink to="/profile" className='font-weight-bold' id="profile"> <HiUser className='mr-2' />Profile</NavLink><br /><br />

                            <NavLink to="/shippingAddress" className='font-weight-bold'><FaAddressBook className='mr-2' />Address</NavLink><br /><br />
                            <NavLink to="/changepass" className='font-weight-bold'>< FaExchangeAlt className='mr-2' />Change Password</NavLink><br /><br />

                        </Col>

                        <Col xs={8}>
                            <br />
                            <h3 className='text-left'>Shipping Addresses</h3>
                            <hr />
                            <Row className='text-left font-weight-bold mt-3'>

                                <Card style={{width:"500px"}}>
                                    <Card.Header>User's Addresses</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                         {  console.log(userData.deliveryAddress)}

                                         {userData.deliveryAddress.map((add) => {
                                             return(
                                                 <>
                                                  <ul>
                                                     <li>{add.address}</li>
                                                      <li>{add.city}</li>
                                                      <li>{add.state}</li>
                                                      <li>{add.country}</li>
                                                      <li>{add.pincode}</li>
                                                  </ul>
                                                </>
                                                
                                             )
                                         })}

                                         {/* {
                                             add.map((item) => {
                                                 return(
                                                     <ul>
                                                         <li>{item.address}</li>
                                                     </ul>
                                                 )
                                             })
                                         } */}

                                        </Card.Text>
                                        <Button variant="primary" onClick={orderPlaced}>Select Address</Button>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </Container>
        </div>
    )
}


export default ShippingAddress
