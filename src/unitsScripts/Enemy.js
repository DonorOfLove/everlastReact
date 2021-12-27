import React, { useContext} from 'react';
import Context from "../context";
import Boss from "../Components/battleGround/Boss";

import Creep from "../Components/battleGround/Creep";

const Enemy = (props) => {

    const {user} = useContext(Context)
    const enemy = props.enemy
    function choser() {
        if (user.campainLvl===5) {
            return <Boss stats={enemy}/>
        } else {return enemy.map((creep) => {
                return (<Creep creep={creep}
                              key={creep.id}/>)})
        }
    }

    return (
        <div>
            {choser()}

        </div>
    );
};

export default Enemy;