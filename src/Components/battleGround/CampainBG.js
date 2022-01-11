import React, {useEffect} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";
import { Route, Redirect } from 'react-router';

const CampainBG = (props) => {

    let heroes = props.state.heroes
    let enemys = props.enemys
    let setEnemys = props.setEnemys
    let setHeroes = props.state.setHeroes
    const user = props.user
    const setUser = props.setUser
    const winCheck = React.useRef()

    function checkNoBack(timer) {
        if (window.location.href !== 'http://localhost:3000/BattleGround/CampainBG') {
            clearInterval(timer)
            refreshHeroes()
        }
    }

    function refreshHeroes() {
        setHeroes([...JSON.parse(sessionStorage.getItem('heroes'))])
    }

    useEffect(function func() {
        if (!user.bgLoad) {
            window.location.href = "http://localhost:3000/map"
        }
        sessionStorage.setItem('heroes', JSON.stringify(heroes))
        for (let hero of heroes) {
            const timer = setInterval(() => {
                checkNoBack(timer)
                setHeroes([...heroes], hero.animation = hero.atck)
                if (hero.hp > 0) {
                    try {
                        // setEnemys(enemys = enemys.filter(thisTarget => thisTarget.hp > 0))
                        setEnemys([enemys.filter(thisTarget => thisTarget.hp > 0)])
                        const randomInt = Math.floor(Math.random() * enemys.length)
                        const enemyWithNewHP = enemys[randomInt].hp - hero.damage
                        const newEnemy = enemys[randomInt]
                        newEnemy.hp = enemyWithNewHP
                        setEnemys([...enemys], {newEnemy})


                    } catch (e) {
                        winCheck.current = true
                        // winCondition()
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
        sessionStorage.setItem('heroes', JSON.stringify(heroes))
        for (let enemy of enemys) {
            const timer = setInterval(() => {
                checkNoBack(timer)
                if (window.location.href !== 'http://localhost:3000/BattleGround/CampainBG') {
                    clearInterval(timer)
                }
                if (enemy.hp > 0) {
                    try {
                        setHeroes([...heroes.filter(thisTarget => thisTarget.hp > 0)])
                        const randomInt = Math.floor(Math.random() * heroes.length)
                        const heroWithNewHP = heroes[randomInt].hp - enemy.damage
                        const newHero = heroes[randomInt]
                        newHero.hp = heroWithNewHP

                        setHeroes([...heroes], {newHero})
                        setHeroes([...heroes.filter(thisTarget => thisTarget.hp > 0)])
                    } catch (e) {clearInterval(timer)
                        winCheck.current = false
                        // winCondition()
                        clearInterval(timer)
                    }
                }
            }, enemy.atkSpeed)
        }
    }, [])
// useEffect(()=>{
//
//     if (winCheck.current === true) {refreshHeroes()
//         setUser({...user, modalVision:true})
//         window.history.back(-2)
//         console.log(user.modalVision)
//         // const reward=100
//         // let prevEnt=user.gold
//         // setUser({user, gold:prevEnt+reward})
//    }
//     if (winCheck.current === false) {
//
//     }
//     },[winCheck.current])





    // function winCondition(){
    //
    // }
    return (
        <div className={'BGWrap'}>
            <div className={'CampainBG'}>
                {heroes.map((hero) => {
                    return (<BattleHero hero={hero}
                                        key={hero.key}
                                        animation={hero.animation}/>)
                })}
            </div>
            {enemys.map((enemy) => {
                return (<Enemy enemy={enemy}
                               key={enemy.key}/>)
            })}
        </div>
    );
};

export default CampainBG;