import React from 'react'
import './ListItem.css'
import { Link } from 'react-router-dom';

function ListItem(props) {
    return (
        <Link className='item' to=''>
            <img src={props.img} alt='img'/>
            Friend
        </Link>
    )
}

export default ListItem