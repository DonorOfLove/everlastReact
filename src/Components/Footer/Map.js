import React, {useEffect} from 'react';
import Hero from "../../unitsScripts/Hero";
import {Link} from 'react-router-dom'

const Map = (props) => {

    const heroes = props.state.heroes
    const user = props.state.user
    const setUser = props.state.setUser
    const dataCheck=(Date.now()-new Date(user.immortalLastVisit))/1000/60/60

    const styles = {
        justifyContent: 'center',
        padding: '40px'
    }

    useEffect(() => {
        setUser({...user, bgLoad: true})
    }, [])

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
            {heroes.length>0?(  <div className='level__option'>
                <Link to='/BattleGround/EverlastTower'>Everlast Tower</Link>
                <Link to='/BattleGround/CampaignBG'>level: {user.campaignLvl}</Link>
                {dataCheck>24?(<Link to='/BattleGround/Immortal'>Immortal</Link>):(`come back in ${Math.round(24-dataCheck)} hours`)}
            </div>):(<div>You need at least 1 hero on your camp to start</div>)}
        </div>
    );
};

export default Map;