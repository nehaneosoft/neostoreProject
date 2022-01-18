import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ReactImageMagnify from 'react-image-magnify';


function ProductDetails(props) {
    const productId = props.match.params.productId;
    const [Product, setProduct] = useState([]);


    const getProductDetails = async () => {
        try {
            const res = await fetch(`products_by_id?id=${productId}`);
            const data = await res.json();
            console.log(data);
            setProduct(data[0]);


        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getProductDetails();

    }, [])
    //console.log(Product);

    return (
        <>

        <Container>
            <Row style={{ margin: "30px" }}>

                <Col xs={6}>
                    <Row>
                       
                            <ProductImage detail={Product} />
                        
                        {/* <Col md={2}>
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: '',
                                    isFluidWidth: true,
                                    src: Product.ProductImage,
                                    width: 200,
                                    height: 200
                                },
                                largeImage: {
                                    src:Product.ProductImage,
                                    isFluidWidth: true,
                                    width: 1000,
                                    height: 1000
                                }
                            }} />
                        </Col> */}
                    </Row>
                </Col>

                <Col xs={6}>
                    <ProductInfo detail={Product} />

                    <Row style={{ fontSize: "25px", marginLeft: "50px", marginTop: "20px" }}>
                        <a className='nav-link-active' id='desc-tab' data-toggle='collapse' href='#description'>Description   |</a>

                        <a style={{ marginLeft: "10px" }} id='feat-tab' data-toggle='collapse' href='#features'>Features</a>
                    </Row>
                    <div style={{ fontSize: "25px", marginLeft: "50px" }}>
                        <p className='collapse' id='description'>{Product.productDesc}</p>
                        <p className='collapse' id='features'>{Product.productDimension} </p>
                    </div>
                </Col>
            </Row>
   </Container>


        </>
    )
}

export default ProductDetails
