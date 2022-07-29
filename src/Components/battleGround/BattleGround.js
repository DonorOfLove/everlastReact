import React from 'react';
import {Routes, Route} from 'react-router-dom'
import CampaignBG from "./gameModes/CampaignBG";
import EverlastTower from "./gameModes/EverlastTower";
import Immortal from "./gameModes/Immortal";
import batIdle from "../../assets/animations/enemyAnimations/bat_idle.gif"
import batAtck from "../../assets/animations/enemyAnimations/bat_atck.gif"
import skeletAtck from "../../assets/animations/enemyAnimations/Skeleton_atck.gif"
import skeletIdle from "../../assets/animations/enemyAnimations/Skeleton_idle.gif"
import fantasmaAtck from "../../assets/animations/enemyAnimations/Sprite-fantafantasma_atck.gif"
import fantasmaIdle from "../../assets/animations/enemyAnimations/Sprite-fantfantasma_idle.gif"
import slimeAtck from "../../assets/animations/enemyAnimations/slime_atck.gif"
import slimeIdle from "../../assets/animations/enemyAnimations/slime_idle.gif"

const BattleGround = (props) => {

    const [user, setUser] = [props.user, props.setUser]
    const [heroes, setHeroes] = [props.heroes, props.setHeroes]
    const [counter, setCounter] = React.useState(0)
    const [bgLoad, setBgLoad] = React.useState(false)

    React.useEffect(() => {
        setBgLoad(true)
    }, [])

    function randomEnemyAnimation() {
        let animations = [[batIdle, batAtck,1200],[fantasmaIdle,fantasmaAtck,900],[slimeIdle,slimeAtck,800]]
        let randomInt = Math.floor(Math.random() * animations.length)
        return animations[randomInt]
    }

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
                                                              enemyAnimation={randomEnemyAnimation()}
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
                                                                    bgLoad={bgLoad}
                                                                    enemyAnimation={randomEnemyAnimation}/>}
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