import React, {useEffect, useContext} from 'react';
import BattleHero from "../../../unitsScripts/BattleHero";
import Context from "../../../context";
import idle from "../../../assets/animations/enemyAnimations/immortal_idle.gif"
import atck from "../../../assets/animations/enemyAnimations/immortal_atck.gif"
import {useNavigate} from "react-router-dom";

const Immortal = (props) => {
    const immortalImg = document.getElementsByClassName('immortal')[0]
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(props.state.heroes)))
    const heroAtckAnimation = props.heroAtckAnimaton
    const heroIdleAnimation = props.heroIdleAnimation
    let [counter, setCounter] = React.useState(1)
    const [immortal, setImmortal] = React.useState({atckCounter: 0, damage: counter * 0.1, atckSpeed: 3000})
    const context = useContext(Context)
    const [user, setUser] = [context.user, context.setUser]
    const history = useNavigate()

    function checkNoBack(timer) {
        if (window.location.pathname !== '/BattleGround/Immortal') {
            clearInterval(timer)
            history('/Map')
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
                setCounter(counter += hero.damage)
                if (heroes.length == 0) {
                    clearInterval(timer)
                }
                setTimeout(() => heroIdleAnimation(hero), hero.animationSpeed)
            }, hero.atkSpeed)
        }
        setImmortal({...immortal, atckCounter: 1})
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            checkNoBack(timer)
            try {
                immortalImg.src = atck
            } catch (e) {
                console.log(e)
            }
            try {
                const randomInt = Math.floor(Math.random() * heroes.length)
                const heroWithNewHP = heroes[randomInt].hp - immortal.damage
                const newHero = heroes[randomInt]
                newHero.hp = heroWithNewHP
                setHeroes([...heroes], {newHero})
                setHeroes([...heroes = heroes.filter(thisTarget => thisTarget.hp > 0)])
                setImmortal({...immortal, atckCounter: immortal.atckCounter + 1, damage: counter * 0.03})
            } catch (e) {
                clearInterval(timer)
            }
            setTimeout(() => {
                try {
                    immortalImg.src = idle
                } catch (e) {
                    console.log(e)
                }
            }, 1700)
        }, immortal.atckSpeed)
    }, [immortal.atckCounter])

    useEffect(() => {
        if (heroes.length == 0) {
            setUser({
                ...user,
                modalVision: true,
                modalText: `you earn ${counter} gold, come back in 24 hours`,
                gold: user.gold + counter,
                immortalLastVisit: Date.now()
            })
            history('/Map')
        }
    }, [heroes])

    return (
        <div className={'BGWrap' + ' ' + 'immortalBG'}>
            <div className='damage_counter'>damage:{counter}</div>
            <div className={'BG__heroes'}>
                {heroes.map((hero) => {
                    return (<BattleHero hero={hero}
                                        key={hero.key}
                                        animation={hero.animation}/>)
                })}
            </div>
            <div className={'BG__enemies'}>
                <img src={idle} className='immortal'/>
            </div>
        </div>
    );
};

export default Immortal;