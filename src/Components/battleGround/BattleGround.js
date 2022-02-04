import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import CampaignBG from "./CampaignBG";
import EverlastTower from "./EverlastTower";
import Immortal from "./Immortal";

const BattleGround = (props) => {
    const user = props.user
    const setUser = props.setUser

    // function kof() {
    //     let k = user.campaignLvl * 4
    //     return k
    // }
    const [counter, setCounter] = React.useState(0)
    let [enemies, setEnemies] = React.useState()
    useEffect(() => {
        setEnemies(() => {
            if (user.campaignLvl % 5 !== 0) {
                return [{hp: 20, damage: 1, atkSpeed: 3000, defence: 10, key: Math.random()}]
            } else {
                return [{hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},
                ]
            }
        })
    }, [])
    // [{hp: 5, damage: 1, atkSpeed: 3000, defencea: 1, key: Math.random()},
    //         {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key :Math.random()},
    //          {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},
    //      ]
    return (
        <div className={'CampaignBG'}>
            <Routes>
                <Route path='CampaignBG' element={<CampaignBG state={props}
                                                              enemies={enemies}
                                                              setEnemies={setEnemies}
                                                              setUser={setUser}
                                                              user={user}/>}
                />
                <Route path='EverlastTower' element={<EverlastTower state={props}
                                                                    enemies={enemies}
                                                                    setEnemies={setEnemies}
                                                                    setUser={setUser}
                                                                    user={user}/>}
                />
                <Route path='Immortal' element={<Immortal state={props}
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