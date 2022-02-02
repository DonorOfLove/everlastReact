import React from 'react';
import img from "../style/animations/B_witch.gif";

const BattleHero = ({hero,animation}) => {

    return (

        <div>{hero.hp}
            {/*<img src={animation} alt="" width={300}height={160}/>*/}

        </div>
    );
};

export default BattleHero;