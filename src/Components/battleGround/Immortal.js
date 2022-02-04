import React from 'react';
import BattleHero from "../../unitsScripts/BattleHero";

const Immortal = (props) => {
    let [heroes, setHeroes] = React.useState(JSON.parse(JSON.stringify(props.state.heroes)))
    let [counter, setCounter] = React.useState(props.counter)

    React.useEffect(() => {
        let prev=counter
            for (let hero of heroes) {
                setInterval(()=>{
                    setCounter(counter+=hero.damage)
           }, hero.atkSpeed)
            }
        }
        , [])

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
                damage:{counter }
            </div>
        </div>
    );
};

export default Immortal;