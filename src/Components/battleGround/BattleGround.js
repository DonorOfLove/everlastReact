import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import CampainBG from "./CampainBG";

const BattleGround = (props) => {
    const user = props.user

    // function kof() {
    //     let k = user.campainLvl * 4
    //     return k
    // }

    const [enemy, setEnemy] = React.useState(()=>{ if (user.campainLvl % 5 == 0) {
        return [{hp: 20, damage: 5, atkSpeed: 3, defence: 10}]
    } else {
        return [{hp: 5, damage: 1, atkSpeed: 3, defence: 1, id: Math.random()},
            {hp: 5, damage: 1, atkSpeed: 3, defence: 1, id: Math.random()},
            {hp: 5, damage: 1, atkSpeed: 3, defence: 1, id: Math.random()},
        ]}}
       )

    return (
        <div className={'CampainBG'}>
            <Routes>
                <Route path='CampainBG' element={<CampainBG state={props}
                                                            enemy={enemy}
                                                            setEnemy={setEnemy}/>}/>
            </Routes>

        </div>
    );
};

export default BattleGround;