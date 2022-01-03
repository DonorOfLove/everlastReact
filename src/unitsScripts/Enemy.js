import React, { useContext} from 'react';
import Context from "../context";
import Boss from "../Components/battleGround/Boss";

import Creep from "../Components/battleGround/Creep";

const Enemy = (props) => {

    const enemy = props.enemy

    return (
        <div>
            {enemy.hp}

        </div>
    );
};

export default Enemy;