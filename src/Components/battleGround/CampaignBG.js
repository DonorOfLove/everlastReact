import React, {useEffect} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";

const CampaignBG = (props) => {
    const user = props.user
    const setUser = props.setUser
    const winCheck = React.useRef()
    const heroAtckAnimation = props.heroAtckAnimaton
    const heroIdleAnimation = props.heroIdleAnimation

    let [enemies, setEnemies] = React.useState(() => {
        if (user.campaignLvl % 5 == 0) {
            return [{hp: 20, damage: 1, atkSpeed: 3000, defence: 10, key: Math.random()}]
        } else {
            return [{hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},
            ]
        }
    })
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(props.state.heroes)))

    function checkNoBack(timer) {
        if (window.location.href !== 'http://localhost:3000/BattleGround/CampaignBG') {
            clearInterval(timer)
        }
    }

    useEffect(function func() {
        if (!user.bgLoad) {
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
                      heroIdleAnimation(hero)
                        winCheck.current = true
                        clearInterval(timer)
                    }
                    if (heroes.length == 0 || enemies.length == 0 || window.location.href !== 'http://localhost:3000/BattleGround/CampaignBG') {
                        clearInterval(timer)
                    }
                    setTimeout(() => heroIdleAnimation(hero), hero.animationSpeed)
                }
            }, hero.atkSpeed)
        }
    }, [])

    useEffect(function func() {
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
                        winCheck.current = false
                        clearInterval(timer)
                    }
                }
            }, enemy.atkSpeed)
        }
    }, [])
    React.useEffect(() => {
        if (winCheck.current === true) {
            window.history.back(-1)
            setUser({
                ...user,
                modalText: 'iziPizi sosite mobi',
                modalVision: true,
                gold: user.campaignLvl * 100,
                campaignLvl: user.campaignLvl + 1
            })
        }
        if (winCheck.current === false) {
            window.history.back(-1)
            setUser({...user, modalVision: true, modalText: 'better luck next time('})
        }
    }, [winCheck.current])

    return (
        <div className={'BGWrap'}>
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

export default CampaignBG;