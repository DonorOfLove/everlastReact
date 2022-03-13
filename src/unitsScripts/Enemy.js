import React from 'react';
import img from "../assets/animations/heroAnimations/witch_idle.gif";

const Enemy = ({enemy,animation}) => {


    return (
        <div className='enemy'>
            <div className={'hp__bar'}>{enemy.hp}</div>
            <img src={animation}/>
        </div>
    );
};

export default Enemy;