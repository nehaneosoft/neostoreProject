import React,{useState, useEffect} from 'react';
import {Container, Form, Button} from 'react-bootstrap';

const EditDetails = (props) => {
    const userId = props.match.params.userId
    const [details, setDetails] = useState([]);

    const getUserDetails = async() => {
        try{
            const res = await fetch (`/user_by_id?id=${userId}`);
            const data = await res.json();
            setDetails(data[0]);

        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getUserDetails();
    }, [])




    return (
        <>
        <Container  className='py-5'>
        <div className='col-md-8 mx-auto'>
           <h3>Edit User Details</h3>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={details.firstName} placeholder="First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={details.lastName} placeholder="Last Name" />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="number" value={details.phoneNumber} placeholder="Mobile No" />
                </Form.Group>

                <Button variant="primary" type="submit">
                   Update
                </Button>
            </Form>
            </div>
            </Container>
        </>
    )
}

export default EditDetails
