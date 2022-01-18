import React from 'react';
import './Header.css'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Badge, Dropdown } from 'react-bootstrap'
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { UserContext } from '../reducer/UserContext';
import {useContext} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const Header = () => {
    const {state, dispatch} = useContext(UserContext);

    const dispatche = useDispatch()
    const cartState = useSelector((state) => state.cartReducer);

    const RenderMenu = () => {
        if (state) {
            return(
                <>
                <Dropdown className='my-2 ms-4'>
                            <Dropdown.Toggle variant="light">
                                <FaUser color="black" fontSize="25px" /> </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="/myaccount"> My Account</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                </>
            )
        }else{
            return(
            <>
            <Dropdown className='my-2 ms-4'>
                            <Dropdown.Toggle variant="light">
                                <FaUser color="black" fontSize="25px" /> </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/login">Login</Dropdown.Item>
                                <Dropdown.Item href="/register">Register</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

            </>
            )
        }
    }
    return (
        <>
         
            <Navbar bg="dark" variant='dark' expand="lg" color="white" className='my-2'>
        
                <Navbar.Brand href="/"><h2>Neo<span style={{ color: "red" }}>STORE</span></h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="/" className='px-5' style={{ color: "white" }}>Home</Nav.Link>
                        <Nav.Link href="/products" className='px-5' style={{ color: "white" }}>Products</Nav.Link>
                        <Nav.Link href="/orders" className='px-5' style={{ color: "white" }}>Orders</Nav.Link>
                    </Nav>

                    <Nav className='mx-auto'>
                        <Form>

                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-1 my-2"
                            //aria-label="Search"
                            />
                        </Form>
                    <Link to="/cartdetails">  <Button variant="light" className='mx-1 my-2 px-3'><FaShoppingCart className='mr-1' color="black" font-size="25px" /><Badge pill bg="danger">{cartState.cartItems.length}</Badge> Cart </Button></Link>

                        <RenderMenu />

                    </Nav>

                </Navbar.Collapse>
                
            </Navbar>
            
           
        </>
    )
}

export default Header
