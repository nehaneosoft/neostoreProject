import React from 'react';
import { Carousel } from 'react-bootstrap';
//import sofa  from '../Images/Sofa.jpg';
import sofaCollection from '../Images/sofaCollection.jpg';
import bedone from '../Images/bed1.jpg';
import sof from '../Images/sof.jpg';
import fur from '../Images/fur.jpg'
const Home = () => {
    return (
        <>
            
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src={sof}
                            height="420px"
                            width="700px"
                            alt="First slide"
                        />
                        
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src={fur}
                            height="420px"
                            width="700px"
                            alt="Second slide"
                        />

                      
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src={bedone}
                            height="420px"
                            width="700px"
                            alt="Third slide"
                        />

                       
                    </Carousel.Item>

                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src={sofaCollection}
                            height="420px"
                            width="700px"
                            alt="Third slide"
                        />

                       
                    </Carousel.Item>
                </Carousel>

        </>
    )
}

export default Home
