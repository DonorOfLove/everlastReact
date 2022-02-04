import React, {useEffect, useContext} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";
import Context from "../../context";

const EverlastTower = (props) => {
    const context = useContext(Context)
    const [user, setUser] = [context.user, context.setUser]
    let [enemies, setEnemies] = React.useState([
        {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},
        {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},
        {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()}
    ])
    let [stage, setStage] = React.useState(0)
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(props.state.heroes)))


    function checkNoBack(timer) {
        if (window.location.href !== 'http://localhost:3000/BattleGround/EverlastTower') {
            clearInterval(timer)
        }
    }

    function heroesAtck() {
        if (!user.bgLoad) {
            window.location.href = "http://localhost:3000/map"
        }
        for (let hero of heroes) {
            const timer = setInterval(() => {
                setHeroes([...heroes], hero.animation = hero.atck)
                if (hero.hp > 0) {
                    try {
                        const randomInt = Math.floor(Math.random() * enemies.length)
                        const enemyWithNewHP = enemies[randomInt].hp - hero.damage
                        const newEnemy = enemies[randomInt]
                        newEnemy.hp = enemyWithNewHP
                        setEnemies([...enemies], {newEnemy})
                        setEnemies(enemies = enemies.filter(thisTarget => thisTarget.hp > 0))
                    } catch (e) {
                        setStage(stage + 1)
                        setHeroes([...heroes], hero.animation = hero.idle)
                        clearInterval(timer)
                    }
                    if (heroes.length == 0 || enemies.length == 0) {
                        clearInterval(timer)
                    }
                    setTimeout(() => setHeroes([...heroes], hero.animation = hero.idle), hero.animationSpeed)
                }
            }, hero.atkSpeed)
        }
    }

    useEffect(function func() {
        for (let enemy of enemies) {
            const timer = setInterval(() => {
                checkNoBack(timer)
                if (window.location.href !== 'http://localhost:3000/BattleGround/EverlastTower') {
                    clearInterval(timer)
                }
                if (enemy.hp > 0) {
                    try {
                        const randomInt = Math.floor(Math.random() * heroes.length)
                        const heroWithNewHP = heroes[randomInt].hp - enemy.damage
                        const newHero = heroes[randomInt]
                        newHero.hp = heroWithNewHP
                        setHeroes([...heroes], {newHero})
                        console.log('s')
                        setHeroes([...heroes = heroes.filter(thisTarget => thisTarget.hp > 0)])
                    } catch (e) {
                        clearInterval(timer)
                    }
                }
            }, enemy.atkSpeed)
        }
    }, [])

    useEffect(() => {
        console.log('s')
        setEnemies(enemies = [
            {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},
            {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},
            {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()}
        ])
        heroesAtck()
    }, [stage])

    useEffect(() => {
        if (heroes.length == 0) {
            window.history.back(-1)
            setUser({...user, modalVision: true, modalText: 'better luck next time(', gold: user.gold + stage * 100})
        }
    }, [heroes])

    return (
        <div className={'BGWrap'}>
            <div className='stage'>stage:{stage}</div>
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
                })}
            </div>
        </div>
    );
};

export default EverlastTower;