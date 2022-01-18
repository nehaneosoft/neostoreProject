import React from 'react'
import './Footer.css';
import { Button, Container, Form, FormControl, Nav, Row,Col } from 'react-bootstrap';
import jsPDF from 'jspdf';
import tc from '../Images/neotc.jpg';
import {  Link } from 'react-router-dom';


const Footer = () => {

    const pdfGenerate = () => {
        var doc = new jsPDF('landscape', 'px', 'a4', 'false');
        doc.addImage(tc, 'JPG', 65, 20, 500, 400);
        doc.save('TermsAndCond.pdf');
    }

    return (
        <>
            

            <Container fluid className="footer" style={{ background: "black", color: "white", marginTop: "20px" }} >
                    
                                <Row>
                                <Col>
                                <h2>About Company </h2>
                                    <ul>

                                        <li> Neosoft Technologies is a certified global IT consulting and software solutions provider.</li>
                                        <li>Contact Information</li>
                                        <li>Email : contact@neosofttech.com</li>
                                        <li>Phone : +91 22 40500600</li>
                                        <li>MUMBAI, INDIA</li>

                                    </ul>

                                </Col>



                                <Col>
                                <h2>Information</h2>
                                    <ul>
                                        <li><button id="tc" onClick={pdfGenerate}>Terms and Conditions</button></li>
                                        <li>Quality and return policy</li>
                                        <li>Contact Us</li>
                                        <li>Privacy Policy</li>
                                        <li>
                                            <Link to="/locate" style={{color:"white",textDecorationLine:"none"}}>Locate Us</Link>
                                        </li>
                                    </ul>

                                </Col>

                                <Col>
                                <h2>Newsletter</h2>
                                    <ul>
                                        <li>Signup to get all latest updates and to stay tuned with us</li><br />
                                        <li><Form.Control type="text" placeholder="Enter email" style={{color:"black"}}/></li><br />
                                        <li><Button variant="light" className='btn-lg'><Link to="/thank"style={{color:"black",textDecorationLine:"none"}}>Subscribe</Link></Button></li>
                                    </ul>
                                </Col>
                                </Row>

                          
                            <div className='mt-4'>
                                <p className='main-hero-para  text-center w-100'>Copyright &copy; 2021 Neosoft Technologies. All rights reserved</p>
                            </div>

                        
                    

                
            </Container>
        </>
    )
}

export default Footer
