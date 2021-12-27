import React from 'react';

const BattleHero = ({hero}) => {
    return (
        <div className={['BattleHero'+' ' +hero.role]}>
            <div className={'hp__bar'}>{hero.hp}</div>
            <p>{hero.name + '\n' + hero.lvl} </p>


        </div>
    );
};

export default BattleHero;