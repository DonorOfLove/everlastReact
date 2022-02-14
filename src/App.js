import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom'
import BattleGround from "./Components/battleGround/BattleGround";
import MainMenu from "./Components/MainMenu";
import Context from "./context";
import witchIdle from "./style/animations/B_witch.gif"
import whichAtck from "./style/animations/B_witchAtck.gif"
import warriorIdle from "./style/animations/warriorIdle.gif"
import warriorAtck from "./style/animations/WarriorAtck.gif"
import Modal from "./Components/Modal";

function App() {

    let [heroes, setHeroes] = React.useState([
        {
            role: 'tank',
            name: 'Jaj',
            hp: 5,
            damage: 2,
            atkSpeed: 2000,
            defence: 10,
            lvl: 1,
            id: Math.random(),
            key: Math.random(),
            animation: warriorIdle,
            atck: warriorAtck,
            idle: warriorIdle,
            animationSpeed: 1300,
            items: [
                {helmet: {name: 'shapka', type: 'iron', hp: 1, defence: 1}},
                {armor: {}},
                {weapon: {}}
            ]

        },
        {
            role: 'dd',
            name: 'Angry',
            hp: 5,
            damage: 3,
            atkSpeed: 3000,
            defence: 2,
            lvl: 1,
            id: Math.random(),
            key: Math.random(),
            animation: witchIdle,
            idle: witchIdle,
            atck: whichAtck,
            animationSpeed: 900,
            items: [{helmet: {name: 'shapka', type: 'iron', hp: 1, defence: 1}},
                {armor: {name:'sd',defence:2,hp:2}},
                {weapon: {}}]

        },
    ])

    let [user, setUser] = React.useState({
        immortalLastVisit: new Date(2022, 1, 8, 4, 0, 0, 0),
        bgLoad: false,
        gold: 99,
        lvl: 1,
        campaignLvl: 4,
        name: 'stAss',
        modalVision: false,
        modalText: 'something went wrong :,(',
        heroesPull: [
            {
                role: 'tank', name: 'Grog', hp: 2, damage: 1, atkSpeed: 3000, defence: 10, lvl: 1, id: Math.random(),items:[]
            },
            {
                role: 'heal',
                name: 'Mola',
                hp: 5,
                damage: 2,
                atkSpeed: 2000,
                defence: 10,
                lvl: 1,
                id: Math.random(),
                key: Math.random(),
                items:[]
            },
            {
                role: 'dd',
                name: 'Remound',
                hp: 2,
                damage: 5,
                atkSpeed: 3000,
                defence: 2,
                lvl: 1,
                id: Math.random(),
                key: Math.random(),
                items:[]
            },
            {
                role: 'heal',
                name: 'Baptized',
                hp: 5,
                damage: 2,
                atkSpeed: 2000,
                defence: 10,
                lvl: 1,
                id: Math.random(),
                key: Math.random(),
                items:[]
            }],
        itemsStore: [{helmet: {name: 'shapka', type: 'iron', hp: 1, defence: 1}},
        {armor: {name:'sd',defence:2,hp:2}},
            {helmet: {name:'shapka',type:'iron',hp:2}},
        {weapon: {name:'sulfuras',damage:2}}],
    })

    return (
        <Context.Provider value={{user, setUser}}>
            {(user.modalVision) ? <Modal setUser={setUser} user={user}/> : null}
            <Routes>
                <Route path='*' element={MainMenu({heroes, setHeroes, user, setUser})}/>
                <Route path='/BattleGround/*' element={BattleGround({heroes, setHeroes, user, setUser})}/>
                <Route path='MainMenu/*' element={MainMenu({heroes, setHeroes, user, setUser})}/>
            </Routes>
        </Context.Provider>

    )
}


    export default App;

