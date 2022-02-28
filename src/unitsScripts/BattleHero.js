import React from 'react';
import img from "../assets/animations/B_witch.gif";

const BattleHero = ({hero,animation}) => {

    return (

        <div className='BattleHero'>
            <div className={'hp__bar'}>{Math.floor(hero.hp*10)/10}</div>
            <img src={animation} alt="" width={210}height={140}/>
        </div>
    );
};

export default BattleHero;