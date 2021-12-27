import React from 'react';

const Creep = ({creep}) => {

    return (
        <div className='creep'>

            {creep.hp}

        </div>
    );
};

export default Creep;