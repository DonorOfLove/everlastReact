import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import CampaignBG from "./CampaignBG";
import EverlastTower from "./EverlastTower";
import Immortal from "./Immortal";

const BattleGround = (props) => {
    const [user,setUser]=[props.user,props.setUser]
    const [heroes,setHeroes] = [props.heroes,props.setHeroes]
    const [counter, setCounter] = React.useState(0)

    function heroAtckAnimation(hero) {
        setHeroes([...heroes], hero.animation = hero.atck)
    }
    function heroIdleAnimation (hero){
        setHeroes([...heroes], hero.animation = hero.idle)
    }
    return (
        <div className={'CampaignBG'}>
            <Routes>
                <Route path='CampaignBG' element={<CampaignBG state={props}
                                                              heroAtckAnimaton={heroAtckAnimation}
                                                              heroIdleAnimation={heroIdleAnimation}
                                                              setUser={setUser}
                                                              user={user}/>}
                />
                <Route path='EverlastTower' element={<EverlastTower state={props}
                                                                    heroAtckAnimaton={heroAtckAnimation}
                                                                    heroIdleAnimation={heroIdleAnimation}
                                                                    setUser={setUser}
                                                                    user={user}/>}
                />
                <Route path='Immortal' element={<Immortal state={props}
                                                          heroAtckAnimaton={heroAtckAnimation}
                                                          heroIdleAnimation={heroIdleAnimation}
                                                          setUser={setUser}
                                                          user={user}
                counter={counter}
                setCounter={setCounter}/>}
                />
            </Routes>
        </div>
    );
};

export default BattleGround;