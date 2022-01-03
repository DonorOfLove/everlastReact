import React, {useEffect} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";


const CampainBG = (props) => {
    let heroes = props.state.heroes
    let enemys = props.enemys
    let setEnemys = props.setEnemys
    let setHeroes = props.state.setHeroes


    useEffect(function func() {
        for (let hero of heroes) {
            const timer = setInterval(() => {
                setHeroes([...heroes],hero.animation=hero.atck)
                if (hero.hp>0){
                setEnemys(enemys = enemys.filter(thisTarget => thisTarget.hp > 0))
                const randomInt = Math.floor(Math.random() * enemys.length)
                const enemyWithNewHP = enemys[randomInt].hp - hero.damage
                const newEnemy = enemys[randomInt]
                newEnemy.hp = enemyWithNewHP
                setEnemys([...enemys], {newEnemy})
                setEnemys(enemys = enemys.filter(thisTarget => thisTarget.hp > 0))
                if (heroes.length==0||enemys.length==0){
                    clearInterval(timer)
                }
                    setTimeout(()=> setHeroes([...heroes],hero.animation=hero.idle),900)
            }
            }, hero.atkSpeed)
        }
    }, [])

    useEffect(function func() {
        let flag = true
        for (let enemy of enemys) {
            const timer = setInterval(() => {
                if(enemy.hp>0) {

                    setHeroes(heroes = heroes.filter(thisTarget => thisTarget.hp > 0))
                    const randomInt = Math.floor(Math.random() * heroes.length)
                    const heroWithNewHP = heroes[randomInt].hp - enemy.damage
                    const newHero = heroes[randomInt]
                    newHero.hp = heroWithNewHP
                    setHeroes([...heroes], {newHero})
                    console.log(heroes)
                    setHeroes(heroes = heroes.filter(thisTarget => thisTarget.hp > 0))
                    if (heroes.length == 0 || enemys.length == 0) {
                        clearInterval(timer)
                    }
                }
            }, enemy.atkSpeed)
        }
    }, [])

    return (
        <div className={'BGWrap'}>
            <div className={'CampainBG'}>
                {heroes.map((hero) => {
                    return (<BattleHero hero={hero}
                                        key={hero.key}
                                        animation={hero.animation}
                    />)
                })}
            </div>
            {enemys.map((enemy) => {
                return (<Enemy enemy={enemy}
                               key={enemy.key}
                />)
            })}
        </div>
    );
};

export default CampainBG;