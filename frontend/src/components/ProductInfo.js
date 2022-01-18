import React, { useState, useEffect } from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { BiRupee } from 'react-icons/bi';
import { BsShareFill, BsFacebook, BsPinterest } from 'react-icons/bs';
import { IconContext } from "react-icons";
import { AiFillGoogleCircle, AiFillTwitterCircle } from 'react-icons/ai';
import { RiWhatsappFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart} from '../actions/cartAction';

const ProductInfo = (props) => {
    // const cartState = useSelector(state => state.cartReducer)
    // const cartItems = cartState.cartItems;
    // const dispatch = useDispatch();

    const [Product, setProduct] = useState({})

    useEffect(() => {
        setProduct(props.detail)
    }, [props.detail])

    // const addToCartHandler = (_id,productName,productImage,productProducer,productCost,productStock,quantity) => {
    //     dispatch(addToCart(_id,productName,productImage,productProducer,productCost,productStock,quantity))
    // }

    return (
        <>
            <Container>
                <h2 style={{ marginTop: "10px" }}>{Product.productName}</h2>
                <p style={{ fontSize: "25px", marginLeft: "40px" }} >
                    <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={Product.productRating}
                    /></p>
                <hr />
                <h4 style={{ marginLeft: "40px" }}>Price :<span style={{ color: "green" }}><BiRupee />{Product.productCost}</span></h4>

                <p style={{ fontSize: "25px", marginLeft: "40px" }}>Color : {Product.colorName}</p>
                <p style={{ fontSize: "25px", marginLeft: "40px" }}>Share <BsShareFill /></p>

                <Row style={{ fontSize: "25px", marginLeft: "40px" }}>

                    <IconContext.Provider
                        value={{ color: 'blue', size: '50px' }}
                    >
                        <div>
                            <a href="https://www.facebook.com/" target="_blank"><BsFacebook /></a>
                        </div>
                    </IconContext.Provider>
                    <a href='https://www.google.co.in/' target="_blank"> <AiFillGoogleCircle style={{ color: 'red', fontSize: '57px', marginLeft: "25px" }} /></a>
                    <a href='https://www.whatsapp.com/' target="_blank"><RiWhatsappFill style={{ color: 'green', fontSize: '57px', marginLeft: "25px" }} /></a>
                    <a href='https://twitter.com/' target="_blank"><AiFillTwitterCircle style={{ color: '#42b9f5', fontSize: '57px', marginLeft: "25px" }} /></a>
                    <a href='https://in.pinterest.com/' target="_blank"><BsPinterest style={{ color: '#c8232c', fontSize: '50px', marginLeft: "25px" }} /></a>

                </Row>
              

                <Row style={{ fontSize: "25px", marginLeft: "40px" }}>
                    <Button variant='info' style={{marginRight: "20px" , marginTop:"50px", color:"black", fontWeight:'bold'}}>
                        Add To Cart</Button>
                    <Button variant='warning' style={{marginLeft: "20px" , marginTop:"50px", color:"black", fontWeight:'bold'}}>Rate Product</Button>
                </Row>
              
            </Container>

        </>
    )
}

export default ProductInfo
