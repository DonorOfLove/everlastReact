import React, {useEffect, useContext} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";
import Context from "../../context";

const EverlastTower = (props) => {

    const context = useContext(Context)
    const [user, setUser] = [context.user, context.setUser]
    let [enemies, setEnemies] = React.useState([
        {hp: 5, damage: 1, atkSpeed: 2000, defence: 1, key: Math.random()},
    ])
    let [stage, setStage] = React.useState(0)
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(props.state.heroes)))
    const heroAtckAnimation = props.heroAtckAnimaton
    const heroIdleAnimation = props.heroIdleAnimation

    function checkNoBack(timer) {
        if (window.location.href !== 'http://localhost:3000/BattleGround/EverlastTower') {
            clearInterval(timer)
        }
    }

    function heroesAtck() {
        if (!props.bgLoad) {
            window.location.href = "http://localhost:3000/map"
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
                }
            }, enemy.atkSpeed)
        }
    }

    useEffect(() => {
        for (let hero of heroes) {
            props.addStats(hero)
        }
    }, [])

    useEffect(() => {
        heroesAtck()
    }, [stage])

    useEffect(() => {
        if (enemies.length == 0) {
            setEnemies(enemies = [
                {hp: 5, damage: 1, atkSpeed: 2000, defence: 1, key: Math.random()},
                {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},
            ])
            enemyAtck()
        }
    }, [enemies])

    useEffect(() => {
        if (heroes.length == 0) {
            console.log('s')
            setUser({
                ...user,
                modalVision: true,
                modalText: `you passed ${stage} levels and earn ${stage * 100}`,
                gold: user.gold + stage * 100
            })
            window.history.back(-1)
        }
    }, [heroes])

    return (
        <div className={'BGWrap'}>
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
                                   key={enemy.key}/>)
                })}
            </div>
        </div>
    )
}

export default EverlastTower;