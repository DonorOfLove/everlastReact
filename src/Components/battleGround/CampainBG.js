import React, {useEffect} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";

const CampainBG = (props) => {

    let heroes = props.state.heroes
    let enemys = props.enemys
    let setEnemys = props.setEnemys
    let setHeroes = props.state.setHeroes
    const user = props.user
    const winCheck = React.useRef()

    function checkNoBack(timer) {
        if (window.location.href !== 'http://localhost:3000/BattleGround/CampainBG') {
            clearInterval(timer)
        }
    }

    useEffect(function func() {
        if (!user.bgLoad) {
            window.location.href = "http://localhost:3000/map"
        }
        sessionStorage.setItem('heroes',JSON.stringify(heroes))
        for (let hero of heroes) {
            const timer = setInterval(() => {
                checkNoBack(timer)
                setHeroes([...heroes], hero.animation = hero.atck)
                if (hero.hp > 0) {
                    try {
                        setEnemys(enemys = enemys.filter(thisTarget => thisTarget.hp > 0))
                        const randomInt = Math.floor(Math.random() * enemys.length)
                        const enemyWithNewHP = enemys[randomInt].hp - hero.damage
                        const newEnemy = enemys[randomInt]
                        newEnemy.hp = enemyWithNewHP
                        setEnemys([...enemys], {newEnemy})
                        setEnemys(enemys = enemys.filter(thisTarget => thisTarget.hp > 0))
                    } catch (e) {
                        winCheck.current = true
                        clearInterval(timer)
                    }
                    if (heroes.length == 0 || enemys.length == 0 || window.location.href !== 'http://localhost:3000/BattleGround/CampainBG') {
                        clearInterval(timer)
                    }
                    setTimeout(() => setHeroes([...heroes], hero.animation = hero.idle), 900)
                }
            }, hero.atkSpeed)
        }
    }, [])

    useEffect(function func() {

        for (let enemy of enemys) {
            const timer = setInterval(() => {
                checkNoBack(timer)
                if (window.location.href !== 'http://localhost:3000/BattleGround/CampainBG') {
                    clearInterval(timer)
                }
                if (enemy.hp > 0) {
                    try {
                        setHeroes(heroes = heroes.filter(thisTarget => thisTarget.hp > 0))
                        const randomInt = Math.floor(Math.random() * heroes.length)
                        const heroWithNewHP = heroes[randomInt].hp - enemy.damage
                        const newHero = heroes[randomInt]
                        newHero.hp = heroWithNewHP
                        setHeroes([...heroes], {newHero})
                        heroes.filter(thisTarget => thisTarget.hp > 0)
                    } catch (e) {
                        winCheck.current = false
                        clearInterval(timer)
                    }
                }
            }, enemy.atkSpeed)
        }
    }, [])

    React.useEffect(() => {

        if (winCheck.current === true) {
            alert('win')
            setHeroes([...JSON.parse(sessionStorage.getItem('heroes'))])
            console.log(heroes)
            window.location.href = "http://localhost:3000/map"
        }
        if (winCheck.current === false) {
            alert('lose')
            setHeroes([...JSON.parse(sessionStorage.getItem('heroes'))])
            window.location.href = "http://localhost:3000/map"
        }

    }, [winCheck.current])
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