import React from 'react';
import {Button}  from 'react-bootstrap';

const Paginator = ({postsPerPage, totalPosts,paginate}) => {

    const pageNumbers = [];

    for(let i =1; i<=Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }

     

   

    return (
        <nav>
            <ul className="pagination font-weight-bold">
                {pageNumbers.map(number => (
                    <li key ={number} className="page-item">
                        <Button onClick={() => paginate(number)} href="#"className='page-link'>
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>

    );
};

export default Paginator;
