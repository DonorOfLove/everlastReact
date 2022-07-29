import React, {useEffect, useContext} from 'react';
import BattleHero from "../../../unitsScripts/BattleHero";
import Enemy from "../../../unitsScripts/Enemy";
import Context from "../../../context";
import {useNavigate} from "react-router-dom";

const EverlastTower = (props) => {

    const context = useContext(Context)
    const [user, setUser] = [context.user, context.setUser]
    let [enemies, setEnemies] = React.useState([
        {hp: 20, damage: 1, atkSpeed: 2000, defence: 1, key: Math.random(),}])
    let [stage, setStage] = React.useState(0)
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(props.state.heroes)))
    const heroAtckAnimation = props.heroAtckAnimaton
    const heroIdleAnimation = props.heroIdleAnimation
    const history = useNavigate()

    function checkNoBack(timer) {
        if (window.location.pathname !== '/BattleGround/EverlastTower') {
            clearInterval(timer)
            history('/Map')
        }
    }

    function enemyAtckAnimation(enemy) {
        setEnemies([...enemies], enemy.animation = enemy.atck)
    }

    function enemyIdleAnimation(enemy) {
        setEnemies([...enemies], enemy.animation = enemy.idle)
    }

    function heroAtck(hero) {
        const timer = setTimeout(() => {
            checkNoBack(timer)
            heroAtckAnimation(hero)
            if (hero.hp > 0) {
                try {
                    const randomInt = Math.floor(Math.random() * enemies.length)
                    const enemyWithNewHP = enemies[randomInt].hp - hero.damage
                    const newEnemy = enemies[randomInt]
                    newEnemy.hp = enemyWithNewHP
                    setEnemies(prevState => {
                        return [...prevState, {newEnemy}]
                    })
                    setEnemies(enemies = enemies.filter(thisTarget => thisTarget.hp > 0))
                    heroAtck(hero)
                } catch (e) {
                    console.log('hero catch')
                    clearTimeout(timer)
                    heroIdleAnimation(hero)
                }
                setTimeout(() => heroIdleAnimation(hero), hero.animationSpeed)
            }
        }, hero.atkSpeed)
    }

    useEffect(() => {
        if (enemies.length == 0) {
            setStage(prevState=>{return prevState+1})
        }
    }, [enemies.length])

    function enemyAtck(enemy) {
        const timer = setTimeout(() => {
            checkNoBack(timer)
            // enemyAtckAnimation(enemy)
            if (enemy.hp > 0) {
                try {
                    console.log(enemy)
                    const randomInt = Math.floor(Math.random() * heroes.length)
                    const heroWithNewHP = heroes[randomInt].hp - enemy.damage
                    const newHero = heroes[randomInt]
                    newHero.hp = heroWithNewHP
                    setHeroes([...heroes], {newHero})
                    setHeroes(heroes = heroes.filter(thisTarget => thisTarget.hp > 0))
                    enemyAtck(enemy)
                } catch (e) {
                    console.log('en catch')
                    clearTimeout(timer)
                    enemyIdleAnimation(enemy)
                }
                setTimeout(() => enemyIdleAnimation(enemy), enemy.animationSpeed)
            }
        }, enemy.atkSpeed)
    }

    useEffect(() => {
        if (!props.bgLoad) {
            history('/Map')
        }
        const an = props.enemyAnimation()
        console.log('en')
        setEnemies(() => {
            return [
                {
                    hp: stage * 1.5,
                    damage: stage * 2,
                    atkSpeed: 2000,
                    defence: 1,
                    key: Math.random(),
                    animation: an[0],
                    idle: an[0],
                    atck: an[1],
                    animationSpeed: an[2]
                },
                {
                    hp: stage * 1.5,
                    damage: stage * 2,
                    atkSpeed: 3000,
                    defence: 1,
                    key: Math.random(),
                    animation: an[0],
                    idle: an[0],
                    atck: an[1],
                    animationSpeed: an[2]
                },
                {
                    hp: stage * 1.5,
                    damage: stage * 2,
                    atkSpeed: 2000,
                    defence: 1,
                    key: Math.random(),
                    animation: an[0],
                    idle: an[0],
                    atck: an[1],
                    animationSpeed: an[2]
                }
            ]
        })
        for (const hero of heroes) {
            props.addStats(hero)
            heroAtck(hero)
        }
        for (const enemy of enemies) {
            enemyAtck(enemy)
        }

    }, [])

    useEffect(() => {
        console.log('stage up')
        const an = props.enemyAnimation()
        console.log('en')
        setEnemies(() => {
            return [
                {
                    hp: stage * 1.5,
                    damage: stage * 2,
                    atkSpeed: 2000,
                    defence: 1,
                    key: Math.random(),
                    animation: an[0],
                    idle: an[0],
                    atck: an[1],
                    animationSpeed: an[2]
                },
                {
                    hp: stage * 1.5,
                    damage: stage * 2,
                    atkSpeed: 3000,
                    defence: 1,
                    key: Math.random(),
                    animation: an[0],
                    idle: an[0],
                    atck: an[1],
                    animationSpeed: an[2]
                },
                {
                    hp: stage * 1.5,
                    damage: stage * 2,
                    atkSpeed: 2000,
                    defence: 1,
                    key: Math.random(),
                    animation: an[0],
                    idle: an[0],
                    atck: an[1],
                    animationSpeed: an[2]
                }
            ]
        })
        for (const hero of heroes) {
            heroAtck(hero)
        }
    }, [stage])
    //

    //
    // useEffect(() => {
    //     if (heroes.length == 0) {
    //         setUser({
    //             ...user,
    //             modalVision: true,
    //             modalText: `you passed ${stage} levels and earn ${stage * 100}`,
    //             gold: user.gold + stage * 100
    //         })
    //         console.log('heroes')
    //         history('/Map')
    //     }
    // }, [heroes])

    return (
        <div className={'BGWrap' + ' ' + 'everlastBG'}>
            <div className='stage'>stage:{stage}</div>
            <div className={'BG__heroes'}>
                {heroes.map((hero) => {
                    return (<BattleHero hero={hero}
                                        key={hero.key}
                                        animation={hero.animation}/>)
                })}
            </div>
            <div className={'BG__enemies'}>
                {enemies.map((enemy) => {
                    return (<Enemy enemy={enemy}
                                   key={enemy.key}
                                   animation={enemy.animation}/>)
                })}
            </div>
        </div>
    )
}

export default EverlastTower;