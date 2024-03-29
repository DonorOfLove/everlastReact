import React, {useEffect} from 'react';
import BattleHero from "../../../unitsScripts/BattleHero";
import Enemy from "../../../unitsScripts/Enemy"
import {useNavigate}  from "react-router-dom"


const CampaignBG = (props) => {

    const user = props.user
    const setUser = props.setUser
    const winCheck = React.useRef()
    const heroAtckAnimation = props.heroAtckAnimaton
    const heroIdleAnimation = props.heroIdleAnimation
    const enemyAtckAnimation=props.enemyAnimation[1]
    const enemyIdleAnimation=props.enemyAnimation[0]
    const sec=props.enemyAnimation[2]
    const history=useNavigate()

    let [enemies, setEnemies] = React.useState(() => {
        if (user.campaignLvl % 5 === 0) {
            return [{hp: 20, damage: 1, atkSpeed: 3000, defence: 10, key: Math.random()}]
        } else {
            return [{hp: 5, damage: 1, atkSpeed: 2000, defence: 1, key: Math.random(),animation:enemyIdleAnimation,idle:enemyIdleAnimation, atck:enemyAtckAnimation},
                {hp: 5, damage: 1, atkSpeed: 2000, defence: 1, key: Math.random(),animation:enemyIdleAnimation,idle:enemyIdleAnimation, atck:enemyAtckAnimation},
                {hp: 5, damage: 1, atkSpeed: 2000, defence: 1, key: Math.random(),animation:enemyIdleAnimation,idle:enemyIdleAnimation, atck:enemyAtckAnimation},
            ]
        }
    })
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(props.state.heroes)))

    function enemyAtck(enemy) {
        setEnemies([...enemies], enemy.animation = enemy.atck)
    }

    function enemyIdle(enemy) {
        setEnemies([...enemies], enemy.animation = enemy.idle)
    }

    function checkNoBack(timer) {
        if (window.location.pathname !== "/BattleGround/CampaignBG") {
            history('/Map')
            clearInterval(timer)
        }
    }

    useEffect(() => {
        if (!props.bgLoad) {
            history('/Map')
        }
        for (let hero of heroes) {
            props.addStats(hero)
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
                        winCheck.current = true
                        heroIdleAnimation(hero)
                        clearInterval(timer)
                    }
                    setTimeout(() => heroIdleAnimation(hero), hero.animationSpeed)
                }
            }, hero.atkSpeed)
        }
    }, [])

    useEffect(() => {
        for (let enemy of enemies) {
            const timer = setInterval(() => {
                checkNoBack(timer)
                enemyAtck(enemy)
                if (enemy.hp > 0) {
                    try {
                        const randomInt = Math.floor(Math.random() * heroes.length)
                        const heroWithNewHP = heroes[randomInt].hp - enemy.damage
                        const newHero = heroes[randomInt]
                        newHero.hp = heroWithNewHP
                        setHeroes([...heroes], {newHero})
                        setHeroes(heroes = heroes.filter(thisTarget => thisTarget.hp > 0))
                    } catch (e) {
                        winCheck.current = false
                        clearInterval(timer)
                    }
                    setTimeout(() => enemyIdle(enemy), sec)
                }
            }, enemy.atkSpeed)
        }
    }, [])

    useEffect(() => {
        if (winCheck.current === true) {
            history('/Map')
            setUser({
                ...user,
                modalText: `You win, your reward ${user.campaignLvl*100} gold`,
                modalVision: true,
                gold: user.campaignLvl * 100,
                campaignLvl: user.campaignLvl + 1
            })
        }
        if (winCheck.current === false) {
            history('/Map')
            setUser({...user, modalVision: true, modalText: 'better luck next time('})
        }
    }, [winCheck.current])

    return (
        <div className={['BGWrap' + ' ' + 'CampaignBG']}>
            <div className='BG__heroes'>
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

export default CampaignBG;
