import React, {useEffect} from 'react';
import Hero from "../../unitsScripts/Hero";
import {Link} from 'react-router-dom'
import Modal from "../Modal";


const Map = (props) => {
    const heroes = props.state.heroes
    const user = props.state.user
    const setUser = props.state.setUser


    const styles = {
        justifyContent: 'center',
        padding: '40px'
    }
    useEffect(() => {
        setUser({...user,bgLoad:true})
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
            { (user.modalVision) ? <Modal setUser={setUser} user={user}/> : null }
            <span>battle power: {battlePower()}</span>
            <div className='heroes' style={styles}>
                {heroes.map((hero, index) => {
                    return (<Hero hero={hero}
                                  key={hero.id}
                                  index={index}
                    />)
                })}
            </div>
            <div className='level__option'>
            <Link to='/BattleGround/EverlastTower'>Everlast Tower</Link>
            <Link to='/BattleGround/CampaignBG'>level: {user.campaignLvl}</Link>
            </div>
        </div>
    );
};

export default Map;