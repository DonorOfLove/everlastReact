import React, {useEffect} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";

const Immortal = (props) => {
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(props.state.heroes)))
    let [counter, setCounter] = React.useState(1)
    const [immortal, setImmortal] = React.useState({atckCounter: 0, damage: counter * 0.1, atckSpeed: 6000})

    React.useEffect(() => {

            for (let hero of heroes) {
                setInterval(() => {
                    setCounter(counter += hero.damage)
                }, hero.atkSpeed)
            }
            setImmortal({...immortal, atckCounter: 1})
        }
        , [])

    React.useEffect(() => {

        const timer = setInterval(() => {
            if (window.location.href !== 'http://localhost:3000/BattleGround/Immortal') {
                clearInterval(timer)
                console.log('clear')
            }
            try {
                const randomInt = Math.floor(Math.random() * heroes.length)
                const heroWithNewHP = heroes[randomInt].hp - immortal.damage
                const newHero = heroes[randomInt]
                newHero.hp = heroWithNewHP
                setHeroes([...heroes], {newHero})
                setHeroes([...heroes = heroes.filter(thisTarget => thisTarget.hp > 0)])
                console.log(immortal)
                setImmortal({...immortal, atckCounter: immortal.atckCounter + 1, damage: counter * 0.03, atckSpeed: 50000 / counter})
            } catch (e) {
                console.log('catch')
                clearInterval(timer)
            }
        }, 3000)
    }, [immortal.atckCounter])

    return (

        <div className={'BGWrap'}>
            <div className={'BG__heroes'}>
                {heroes.map((hero) => {
                    return (<BattleHero hero={hero}
                                        key={hero.key}
                                        animation={hero.animation}/>)
                })}
            </div>
            <div className={'BG__enemies'}>
                damage:{counter}
            </div>
        </div>
    );
};

export default Immortal;