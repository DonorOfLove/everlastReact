import React from 'react';
import {Routes, Route} from 'react-router-dom'
import CampaignBG from "./CampaignBG";
import EverlastTower from "./EverlastTower";

const BattleGround = (props) => {
    const user = props.user
    const setUser = props.setUser

    // function kof() {
    //     let k = user.campaignLvl * 4
    //     return k
    // }

    let [enemies, setEnemies] = React.useState(
        () => {
            if (user.campaignLvl % 5 == 0) {
                return [{hp: 20, damage: 5, atkSpeed: 3000, defence: 10}]
            } else {
                return [{hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},

                ]
            }
        }
        // [{hp: 5, damage: 1, atkSpeed: 3000, defencea: 1, key: Math.random()},
        //         {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key :Math.random()},
        //          {hp: 5, damage: 1, atkSpeed: 3000, defence: 1, key: Math.random()},
        //      ]
    )

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
            </Routes>
        </div>
    );
};

export default BattleGround;