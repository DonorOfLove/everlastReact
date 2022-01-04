import React, {useEffect} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";


const CampainBG = (props) => {
    let heroes = props.state.heroes
    let enemys = props.enemys
    let setEnemys = props.setEnemys
    let setHeroes = props.state.setHeroes
    const user=props.user



    useEffect(function func() {
        if (!user.bgLoad){
            window.location.href="http://localhost:3000/map"

        }

        for (let hero of heroes) {
           const  timer = setInterval(() => {
                setHeroes([...heroes],hero.animation=hero.atck)
                if (hero.hp>0){
                setEnemys(enemys = enemys.filter(thisTarget => thisTarget.hp > 0))
                const randomInt = Math.floor(Math.random() * enemys.length)
                const enemyWithNewHP = enemys[randomInt].hp - hero.damage
                const newEnemy = enemys[randomInt]
                newEnemy.hp = enemyWithNewHP
                    if (window.location.href=='http://localhost:3000/BattleGround/CampainBG') {

                        clearInterval(timer)

                    }
                setEnemys([...enemys], {newEnemy})
                setEnemys(enemys = enemys.filter(thisTarget => thisTarget.hp > 0))
                if (heroes.length==0||enemys.length==0||window.location.href!=='http://localhost:3000/BattleGround/CampainBG'){
                    clearInterval(timer)
                }
                    setTimeout(()=> setHeroes([...heroes],hero.animation=hero.idle),900)
            }
            }, hero.atkSpeed)
        }
    }, [])

    useEffect(function func() {

        for (let enemy of enemys) {
           const  timer = setInterval(() => {
                if (window.location.href!=='http://localhost:3000/BattleGround/CampainBG'){
                    clearInterval(timer)
                }
                if(enemy.hp>0) {
                    setHeroes(heroes = heroes.filter(thisTarget => thisTarget.hp > 0))
                    const randomInt = Math.floor(Math.random() * heroes.length)
                    const heroWithNewHP = heroes[randomInt].hp - enemy.damage
                    const newHero = heroes[randomInt]
                    newHero.hp = heroWithNewHP
                    if (window.location.href=='http://localhost:3000/BattleGround/CampainBG') {
                        clearInterval(timer)
                    }
                    setHeroes([...heroes], {newHero})
                    console.log(heroes)
                    setHeroes(heroes = heroes.filter(thisTarget => thisTarget.hp > 0))
                    if (heroes.length == 0 || enemys.length == 0||window.location.href!=='http://localhost:3000/BattleGround/CampainBG') {
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