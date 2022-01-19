import React from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";



const EverlastTower = (props) => {
    let heroes1 = props.state.heroes
    let enemies = props.enemies
    let setEnemies = props.setEnemies
    const user = props.user
    const setUser = props.setUser
    const winCheck = React.useRef()
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(heroes1)))
    const reward = React.useRef()


    return (
        <div className={'BGWrap'}>
            <div className={'BG__heroes'}>
                {heroes.map((hero) => {
                    return (<BattleHero hero={hero}
                                        key={hero.key}
                                        animation={hero.animation}
                    />)

                })}

            </div>
            <div className={'BG__enemies'}>
                {enemies.map((enemy) => {
                    return (<Enemy enemy={enemy}
                                   key={enemy.key}
                    />)
                })}</div>
        </div>
    );
};

export default EverlastTower;