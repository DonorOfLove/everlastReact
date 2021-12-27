import React from 'react';
import Hero from "../../unitsScripts/Hero";
import {Link} from 'react-router-dom'



const Map = (props) => {
    let heroes = props.state.heroes
    let user=props.state.user

    const styles = {
        justifyContent: 'center',
        padding: '40px'
    }

    function battlePower() {
        let bp = 0
        for (let curHero of heroes) {
            bp += curHero.damage + curHero.hp + curHero.atkSpeed + curHero.defence
        }
        return bp
    }

    return (
        <div className='map'>
            <span>battle power: {battlePower()}</span>
            <div className='heroes' style={styles}>
                {heroes.map((hero, index) => {
                    return (<Hero hero={hero}
                                  key={hero.id}
                                  index={index}
                    />)
                })}
            </div>

            <Link to='/BattleGround/CampainBG'>Start level: {user.campainLvl}</Link>
        </div>
    );
};

export default Map;