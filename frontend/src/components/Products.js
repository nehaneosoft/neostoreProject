import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Accordion, Button, Dropdown, Card } from 'react-bootstrap';
import { FaAngleDown } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { BiRupee } from 'react-icons/bi';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import StarRatingComponent from 'react-star-rating-component';
import Paginator from '../components/Paginator';
import {Link} from 'react-router-dom';
import axios from "axios";
//import Paginate from './Paginator';
import { useDispatch, useSelector  } from 'react-redux';
import { addToCart } from '../actions/cartAction';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");

    //for quantity
    const [quantity, setQuantity] = useState(1);

    //for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    //change page
    const paginate = (pageNumbers) => setCurrentPage(pageNumbers)

     //getting  current page products
     const indexOfLastProd = currentPage * postsPerPage;
     const indexOfFirstProd = indexOfLastProd - postsPerPage;
     const currentProd = products.slice(indexOfFirstProd, indexOfLastProd);

    //products start
    const getProducts = async () => {
        try {
            const res = await fetch('/allProducts');
            setProducts(await res.json());
            setloading(false);

        } catch (err) {
            console.log(err);
            setloading(false);

        }
    }
    useEffect(() => {
        getProducts();

    }, []);
    //product end


//category start
    const getCategory = async () => {
        try {
            const res = await fetch('/allCategory');
            setCategoryList(await res.json());
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
       getCategory();
    }, []);
    //sort by categoryID
    const getCategoryID = async(id) => {
        try{
            const res = await fetch(`/categorizedProduct/${id}`);
           setProducts(await res.json());

        }catch(err){
            console.log(err);
        }
    }
//category end

//color start
const getColor = async () => {
    try {
        const res = await fetch('/allColor');
        setColorList(await res.json());
    } catch (err) {
        console.log(err);
    }
}

useEffect(() => {
   getColor();
}, []);

//sort by colorID
const getColorID = async(id) => {
    try{
        const res = await fetch(`/colorizedProduct/${id}`);
        setProducts(await res.json());

    }catch(err){
        console.log(err);
    }
}
//color end

// sort by price
    // ascending price
   const incPrice = (e) => {
       e.preventDefault();
    products.sort((a, b) => parseInt(a.productCost) - parseInt(b.productCost));
    const indexOfLastProd = currentPage * postsPerPage;
    const indexOfFirstProd = indexOfLastProd - postsPerPage;
    const currentProd = products.slice(indexOfFirstProd, indexOfLastProd);
    setProducts(currentProd);
    //console.log(products)
   }

   const descPrice = () => {
    products.sort((a, b) => parseFloat(b.productCost) - parseFloat(a.productCost))
    const currentProd = products.slice(indexOfFirstProd, indexOfLastProd);
    setProducts(currentProd);
    //console.log(products)
   }
   //rating

//    const getProductRating = () => {
//     //axios.get("api/product/getProduct/rating").then((res) => setProducts(res.data))
//     try{
//         const res = await fetch('/getAllRating');
//         products
//         setProducts()

//     }catch(err){
//         console.log(err);
//     }
// }
  const Rating = () => {
    products.sort((a, b) => parseFloat(b.productRating) - parseFloat(a.productRating))
    const currentProd = products.slice(indexOfFirstProd, indexOfLastProd);
    setProducts(currentProd);
  }

  // add to cart
  const dispatch = useDispatch()

  const addToCartHandler = (_id,productName,productImage,productProducer,productCost,productStock,quantity) => {
      dispatch(addToCart(_id,productName,productImage,productProducer,productCost,productStock,quantity))
  }

    return (
        <>
            <Container>

                {loading ? (
                    <h1>Loading...</h1>
                ) : error ? (
                    <p>{error}</p>
                ) : (

                    <Row>
                        <Col md={3} >
                            <Row>
                                <Button variant="outline-dark" className='mb-2' onClick={() => getProducts()}>All Products</Button>
                            </Row>

                            <Row>
                                <Accordion >
                                    <Accordion.Item>
                                        <Accordion.Header style={{ fontSize: "20px", fontFamily: "sans-serif", borderBlockColor: "grey" }} className='ml-0 pl-0 text-left mb-0 py-2' variant="light"> <FaAngleDown /> Categories</Accordion.Header>
                                        {categoryList.map((cat) => {
                                            return(
                                                <Accordion.Body>
                                                <Button variant='light'onClick={() => getCategoryID(cat._id)}>{cat.categoryName}</Button>
                                            </Accordion.Body>
                                            )
                                        })}
                                        </Accordion.Item>
                                    </Accordion>
                                </Row>


                            <Row>
                                    <Accordion>
                                    <Accordion.Item>
                                        <Accordion.Header style={{ fontSize: "20px", fontFamily: "sans-serif" }} className='ml-0 pl-0 mb-0 text-left py-2'> <FaAngleDown /> Colors</Accordion.Header>
                                        {colorList.map((colr) => {
                                            return(
                                            <Accordion.Body>
                                                <Button variant='light'onClick={() => getColorID(colr._id)}>{colr.colorName}</Button>
                                            </Accordion.Body>

                                            )
                                        })}   
                                    </Accordion.Item>
                                </Accordion>
                            </Row>
                        </Col>
                        {/* First column ended */}

                        <Col md={9}>

                            <Row>
                                <div style={{ fontSize: "20px" }}>
                                    Sort By : <Button className='mx-2'onClick={Rating}><AiFillStar /></Button>
                                    <Button className='mx-2'onClick={incPrice} ><BiRupee /><BsArrowUp /></Button>
                                    <Button className='mx-2' onClick={descPrice}><BiRupee /><BsArrowDown /></Button>

                                </div>
                            </Row>
                            <Row xs={1} md={2} lg={3} className="g-3 mt-2 mb-2">

                                
                                     {currentProd.filter((val) => {
                                        if (search === "") {
                                            return val
                                        }
                                        else if (val.categoryName.toLowerCase().includes(search.toLowerCase()) || val.colorName.toLowerCase().includes(search.toLowerCase())) {
                                            return val
                                        }
                                    })
                                 .map((curEle) => {
                                        return (
                                            <Col className="g-3 mt-2 mb-2" style={{ fontSize: "15px" }}>
                                                <Card>
                                                    <Card.Img variant="top" src={curEle.productImage} height="130"
                                                        width="150" />
                                                    <Card.Body>
                                                        <Card.Title className='text-left'>
                                                            <Card.Title style={{ color: "blue" }}><Link to={`/${curEle._id}`}> {curEle.productName} </Link></Card.Title>
                                                            <Card.Title><BiRupee />{curEle.productCost}</Card.Title>
                                                        </Card.Title>


                                                        <Card.Text className="text-center" style={{ fontSize: "25px" }}>
                                                            <Button variant='danger' className="text-center"onClick={() => addToCartHandler(curEle._id,curEle.productName,curEle.productImage,curEle.productProducer,curEle.productCost,curEle.productStock,quantity)}>Add To Cart</Button><br />
                                                            <StarRatingComponent
                                                                name="rating"
                                                                starCount={5}
                                                                value={curEle.productRating}
                                                            />
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )

                                    })
                                }

                            </Row>
                            <Row>
                            <Paginator  postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate}/>
                            </Row>
                        </Col>


                    </Row>
                )}

            </Container>

        </>
    )
}

export default Products;
