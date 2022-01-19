import React from 'react';

const Enemy = (props) => {

    const enemy = props.enemy

    return (
        <div>
            {enemy.hp}

        </div>
    );
};

export default Enemy;