import React, {useEffect, useContext} from 'react';
import BattleHero from "../../../unitsScripts/BattleHero";
import Enemy from "../../../unitsScripts/Enemy";
import Context from "../../../context";
import {useNavigate} from "react-router-dom";

const EverlastTower = (props) => {

    const context = useContext(Context)
    const [user, setUser] = [context.user, context.setUser]
    let [enemies, setEnemies] = React.useState([
        {hp: 5, damage: 1, atkSpeed: 2000, defence: 1, key: Math.random()}])
    let [stage, setStage] = React.useState(0)
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(props.state.heroes)))
    const heroAtckAnimation = props.heroAtckAnimaton
    const heroIdleAnimation = props.heroIdleAnimation
    const history=useNavigate()

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

    function heroesAtck() {
        if (!props.bgLoad) {
           history('/Map')
        }
        for (let hero of heroes) {
            const timer = setInterval(() => {
                checkNoBack(timer)
                heroAtckAnimation(hero)
                if (hero.hp > 0) {
                    try {
                        const randomInt = Math.floor(Math.random() * enemies.length)
                        const enemyWithNewHP = enemies[randomInt].hp - hero.damage
                        const newEnemy = enemies[randomInt]
                        newEnemy.hp = enemyWithNewHP
                        setEnemies([...enemies], {newEnemy})
                        setEnemies(enemies = enemies.filter(thisTarget => thisTarget.hp > 0))
                    } catch (e) {
                        clearInterval(timer)
                        setStage(stage + 1)
                        heroIdleAnimation(hero)
                    }
                    setTimeout(() => heroIdleAnimation(hero), hero.animationSpeed)
                }
            }, hero.atkSpeed)
        }
    }

    function enemyAtck() {
        for (let enemy of enemies) {
            const timer = setInterval(() => {
                checkNoBack(timer)
                enemyAtckAnimation(enemy)
                if (enemy.hp > 0) {
                    try {
                        const randomInt = Math.floor(Math.random() * heroes.length)
                        const heroWithNewHP = heroes[randomInt].hp - enemy.damage
                        const newHero = heroes[randomInt]
                        newHero.hp = heroWithNewHP
                        setHeroes([...heroes], {newHero})
                        setHeroes(heroes = heroes.filter(thisTarget => thisTarget.hp > 0))
                    } catch (e) {
                        clearInterval(timer)
                    }
                     setTimeout(() => enemyIdleAnimation(enemy), enemy.animationSpeed)
                }
            }, enemy.atkSpeed)
        }
    }

    useEffect(() => {
        for (let hero of heroes) {
            props.addStats(hero)
        }
        enemyAtck()
    }, [])

    useEffect(() => {
        heroesAtck()
    }, [stage])

    useEffect(() => {
        if (enemies.length == 0) {
          const an = props.enemyAnimation
            console.log('en')
            setEnemies(enemies = [
                {hp: 5, damage: 1, atkSpeed: 2000, defence: 1, key: Math.random(),animation:an[0],idle:an[0],atck:an[1],animationSpeed:an[2]},
                {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random(),animation:an[0],idle:an[0],atck:an[1],animationSpeed:an[2]},
            ])
            enemyAtck()
        }
    }, [enemies])

    useEffect(() => {
        if (heroes.length == 0) {
            setUser({
                ...user,
                modalVision: true,
                modalText: `you passed ${stage} levels and earn ${stage * 100}`,
                gold: user.gold + stage * 100
            })
            console.log('heroes')
            history('/Map')
        }
    }, [heroes])

    return (
        <div className={'BGWrap'+' '+'everlastBG'}>
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