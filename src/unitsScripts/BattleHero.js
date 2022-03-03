import React from 'react';
import img from "../assets/animations/heroAnimations/witch_idle.gif";

const BattleHero = ({hero,animation}) => {

    return (

        <div className='BattleHero'>
            <div className={'hp__bar'}>{Math.floor(hero.hp*10)/10}</div>
            <img src={animation} alt=""/>

        </div>
    );
};

export default BattleHero;