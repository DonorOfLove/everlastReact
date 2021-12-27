import React, {useEffect} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";

const CampainBG = (props) => {
    const heroes = props.state.heroes
    const enemy = props.enemy
    const setEnemy = props.setEnemy

    useEffect(function func() {
        for (let hero of heroes) {
            const timer = setTimeout(() => {
                if (enemy.hp <= 0) {
                    clearTimeout(timer)
                }else {
                  const randomInt=Math.floor(Math.random() * enemy.length)

                    const newHP = enemy[randomInt].hp - hero.damage
                    const newEnemy = enemy[randomInt]
                    newEnemy.hp = newHP
                    console.log(newEnemy)
                    setEnemy(...enemy[randomInt],newEnemy)}
                func()
            }, hero.atkSpeed)
        }
    }, [])


    return (
        <div className={'BGWrap'}>
            <div className={'CampainBG'}>
                {heroes.map((hero) => {
                    return (<BattleHero hero={hero}
                                        key={hero.id}
                    />)
                })}
            </div>
            <Enemy enemy={enemy}/>
        </div>
    );
};

export default CampainBG;