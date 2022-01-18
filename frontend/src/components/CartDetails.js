import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {FaMinusCircle,FaPlusCircle,FaTrash} from 'react-icons/fa';
import { addToCart , deleteFromCart} from '../actions/cartAction';
import { Link } from 'react-router-dom';


const CartDetails = () => {
    const cartState = useSelector(state => state.cartReducer)
    const cartItems = cartState.cartItems;
    const dispatch = useDispatch();
    const subTotal = cartItems.reduce((x,item) => x + item.totalPrice,0);
    const gst=  0.05 * subTotal;
    const ordTotal = subTotal + gst ;
    return (
        <>
        <Container>

            <Row>
                <Col md={8}>
                    <h1>My Cart</h1>
                    <Row>
                        {
                            cartItems.map((item) => (
                                <>
                            <Col md={4}>
                               <img 
                               alt={item.productName}
                               src={item.productImage}
                               style={{width:"100px" , height: "100px", marginTop:"34px"}} />
                                  <hr  style={{color:"brown", borderWidth:"5px"}} />  
                            </Col>
                            <Col md={6}>
                                    <h5>{item.productName}</h5>
                                    <h6>Quantity :
                                     <FaMinusCircle 
                                    style={{color:"red",marginRight:"10px", fontSize:"23px",cursor:"ponter"}}
                                     onClick={() => {dispatch(addToCart(item._id,item.productName,item.productImage,item.productProducer,item.productCost,item.productStock,item.quantity-1))}}/> 

                                    {item.quantity}

                                    <FaPlusCircle style={{color:"green", marginLeft:"10px", fontSize:"23px",cursor:"ponter"}}
                                     onClick={() => {dispatch(addToCart(item._id,item.productName,item.productImage,item.productProducer,item.productCost,item.productStock,item.quantity+1))}}/>
                                     </h6>
                                    <h6>Price :{item.quantity} x {item.productCost} =  {" "} {item.totalPrice}</h6>
                                    <h6> By {item.productProducer}</h6>
                                    <h6>Status : {item.productStock} in stock </h6>
                                    <hr  style={{color:"black",borderWidth:"5px"}} />      
                            </Col>

                            <Col md={2}>
                                <FaTrash style={{color:"red" , marginTop:"60px", cursor:"pointer"}}
                                onClick={() => {dispatch(deleteFromCart(item))}}
                                />
                            </Col>
                           
                                </>
                            ))}
                            
                        
                    </Row>
                </Col>

                <Col md={4}>
                   
                    <h1>Payment Info</h1>
                    <Row>
                    <h5 style={{marginLeft:"30px", marginTop:"30px"}}>SubTotal</h5>
                    <h5 style={{marginLeft:"30px",marginTop:"30px"}}> Rs : {subTotal} /- </h5>
                    </Row>
                    <hr />

                    <Row>
                    <h5 style={{marginLeft:"30px"}}>GST(5%)</h5>
                    <h5 style={{marginLeft:"30px"}}>Rs : {gst} /- </h5>
                    </Row>
                    <hr />
                    <Row>
                    <h5 style={{marginLeft:"30px"}}>Order Total</h5>
                    <h5 style={{marginLeft:"30px"}}>Rs : {ordTotal} /- </h5>
                    </Row>

                    <Row>
                   <Link to ="/shippingAddress"> <Button variant='primary'  style={{marginLeft:"30px",marginTop:"30px", width:"290px" ,fontWeight:"bold", color:"black",fontSize:"20px"}} >Proceed to buy</Button></Link>
                    </Row>
                  
                </Col>
            

            </Row>
        </Container>
            
        </>
    )
}

export default CartDetails;
