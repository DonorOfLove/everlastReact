import React from 'react';
import {Link} from 'react-router-dom'

const Links = () => {
    return (
        <footer className='footer'>
            <Link to='/Store'>Store</Link>
            <Link to="/Map">Map</Link>
            <Link to='/Heroes'>Heroes</Link>
        </footer>
    );
};

export default Links;
