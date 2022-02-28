import './App.css';
import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import BattleGround from "./Components/battleGround/BattleGround";
import MainMenu from "./Components/MainMenu";
import Context from "./context";
import witchIdle from "./assets/animations/B_witch.gif"
import whichAtck from "./assets/animations/B_witchAtck.gif"
import warriorIdle from "./assets/animations/warriorIdle.gif"
import warriorAtck from "./assets/animations/WarriorAtck.gif"


import Modal from "./Components/Modal";

function App() {

    let [heroes, setHeroes] = useState([
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
            items: {
                helmet: {name: 'juniors helmet', type: 'iron', hp: 1, defence: 1},
                armor: {},
                weapon: {}
            }
        },
    ])

    let [user, setUser] = useState({
        immortalLastVisit: new Date(2022, 1, 8, 4, 0, 0, 0),
        gold: 0,
        lvl: 1,
        campaignLvl: 4,
        name: '',
        modalVision: false,
        modalText: 'something went wrong :,(',
        heroesPull: [
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
                items: {
                    helmet: {name: 'juniors helmet', type: 'iron', hp: 1, defence: 1},
                    armor: {},
                    weapon: {}
                }
            }
        ],
        itemsStore: [
            {helmet: {name: 'shapka', type: 'iron', hp: 1, defence: 1}},
        ],
    })

    const [gameAvailability, setGameAvailability] = useState({
        heroes: [
            {
                role: 'tank',
                name: 'Grog',
                hp: 2,
                damage: 1,
                atkSpeed: 3000,
                defence: 10,
                lvl: 1,
                id: Math.random(),
                items: {
                    helmet: {},
                    armor: {},
                    weapon: {}
                }
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
                items: {
                    helmet: {},
                    armor: {},
                    weapon: {}
                }
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
                items: {
                    helmet: {},
                    armor: {},
                    weapon: {}
                }
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
                items: {
                    helmet: {},
                    armor: {},
                    weapon: {}
                }
            }],
        items: [
            {armor: {name: 'kirasa', defence: 2, hp: 2}},
            {helmet: {name: 'wolf head', type: 'leather', hp: 2}},
            {weapon: {name: 'sulfuras', damage: 2,}}
        ]
    })

    useEffect(() => {
        window.addEventListener('unload', () => {
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('heroes', JSON.stringify(heroes))
            localStorage.setItem('gameAvailability', JSON.stringify(gameAvailability))

        })
    })          //  LOCAL STORE SET
    useEffect(() => {
        setHeroes(JSON.parse(localStorage.getItem('heroes')))
        setUser(JSON.parse(localStorage.getItem('user')))
        setGameAvailability(JSON.parse(localStorage.getItem('gameAvailability')))
        // if (user.name == '') {
        //     setUser({
        //         ...user, modalVision: true, modalText: <input onChange={(e) => {
        //             user.name=e.target.val
        //         }}/>
        //     })
        // }
    }, []) //LOCAL STORE GET

    return (
        <Context.Provider value={{user, setUser, heroes, setHeroes, gameAvailability, setGameAvailability}}>
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

