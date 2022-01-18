import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import ReactImageMagnify from 'react-image-magnify';
import { Row } from 'react-bootstrap';


const ProductImage = (props) => {
    const [Images, setImages] = useState([]);


    useEffect(() => {
        if (props.detail.subImages && props.detail.subImages.length > 0) {
            let subImages = [];
            //subImages.push(props.detail.productImage);

            props.detail.subImages && props.detail.subImages.map(item => {
                subImages.push({
                    original: `${item}`,
                    thumbnail: `${item}`
                })

            })

            setImages(subImages)
        }

        console.log(Images)
    }, [props.detail])



    return (
        <>
            <div>
                <ImageGallery items={Images} />
            </div>
            {/* <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: watchImg300
                },
                largeImage: {
                    src: watchImg1200,
                    width: 1200,
                    height: 1800
                }
            }} />
            ... */}


        </>

    )
}

export default ProductImage
