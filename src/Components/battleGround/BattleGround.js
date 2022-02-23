import React from 'react';
import {Routes, Route} from 'react-router-dom'
import CampaignBG from "./CampaignBG";
import EverlastTower from "./EverlastTower";
import Immortal from "./Immortal";

const BattleGround = (props) => {

    const [user, setUser] = [props.user, props.setUser]
    const [heroes, setHeroes] = [props.heroes, props.setHeroes]
    const [counter, setCounter] = React.useState(0)
    const [bgLoad,setBgLoad]=React.useState(false)

    React.useEffect(()=>{setBgLoad(true)},[])

    function heroAtckAnimation(hero) {
        setHeroes([...heroes], hero.animation = hero.atck)
    }

    function heroIdleAnimation(hero) {
        setHeroes([...heroes], hero.animation = hero.idle)
    }

    function addAdditionalStats(hero) {
        for (let item of Object.entries(hero.items)) {
            for (let stat in item[1]) {
                if (hero.hasOwnProperty(stat) && stat !== 'name') {
                    hero[stat] = hero[stat] + item[1][stat]
                    setHeroes([...heroes], hero)
                }
            }
        }
    }

    return (
        <div className={'CampaignBG'}>
            <Routes>
                <Route path='CampaignBG' element={<CampaignBG state={props}
                                                              heroAtckAnimaton={heroAtckAnimation}
                                                              heroIdleAnimation={heroIdleAnimation}
                                                              setUser={setUser}
                                                              user={user}
                                                              addStats={addAdditionalStats}
                                                              bgLoad={bgLoad}/>}
                />
                <Route path='EverlastTower' element={<EverlastTower state={props}
                                                                    heroAtckAnimaton={heroAtckAnimation}
                                                                    heroIdleAnimation={heroIdleAnimation}
                                                                    setUser={setUser}
                                                                    user={user}
                                                                    addStats={addAdditionalStats}
                                                                    bgLoad={bgLoad}/>}
                />
                <Route path='Immortal' element={<Immortal state={props}
                                                          heroAtckAnimaton={heroAtckAnimation}
                                                          heroIdleAnimation={heroIdleAnimation}
                                                          setUser={setUser}
                                                          user={user}
                                                          addStats={addAdditionalStats}
                                                          counter={counter}
                                                          setCounter={setCounter}
                                                          bgLoad={bgLoad}/>}
                />
            </Routes>
        </div>
    );
};

export default BattleGround;