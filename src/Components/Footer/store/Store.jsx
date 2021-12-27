import React from 'react';
import Chest from "./Chest";

const Store = (props) => {
    return (
        <div className='store'>
            <Chest state={props.state}/>
        </div>
    );
};

export default Store;