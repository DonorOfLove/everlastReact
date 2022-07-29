import React, {useEffect, useReducer, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import BattleGround from "./Components/battleGround/BattleGround";
import MainMenu from "./Components/MainMenu";
import Context from "./context";
import witchIdle from "./assets/animations/heroAnimations/witch_idle.gif"
import whitchAtck from "./assets/animations/heroAnimations/witch_atck.gif"
import whitchIcon from "./assets/heroIcons/witch_icon.png"
import warriorIdle from "./assets/animations/heroAnimations/warrior_idle.gif"
import warriorAtck from "./assets/animations/heroAnimations/warrior_atck.gif"
import warriorIcon from "./assets/heroIcons/warrior_icon.png"
import shughekuAtck from "./assets/animations/heroAnimations/shugheku_atck.gif"
import shughekuIdle from "./assets/animations/heroAnimations/shugheku_idle.gif"
import shughekuIcon from "./assets/heroIcons/shugheku_icon.png"
import memphisAtck from "./assets/animations/heroAnimations/Memphis_atck.gif"
import memphisIdle from "./assets/animations/heroAnimations/Memphis_idle.gif"
import memphisIcon from "./assets/heroIcons/Memphis_icon.png"
import defcaleonAtck from "./assets/animations/heroAnimations/defcaleon_atck.gif"
import defcaleonIdle from "./assets/animations/heroAnimations/defcaleon_idle.gif"
import defcaleonIcon from "./assets/heroIcons/defcaleon_icon.png"
import Modal from "./Components/Modal";

function App() {
    let [heroes, setHeroes] = useState([
        {
            role: 'tank',
            name: 'Torn',
            hp: 5,
            damage: 2,
            atkSpeed: 2000,
            defence: 10,
            lvl: 1,
            id: Math.random(),
            key: 3,
            icon: warriorIcon,
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
        {
            role: 'dd',
            name: 'Shugheku',
            hp: 2,
            damage: 5,
            atkSpeed: 3000,
            defence: 2,
            lvl: 1,
            id: Math.random(),
            key: 4,
            icon: shughekuIcon,
            animation: shughekuIdle,
            atck: shughekuAtck,
            idle: shughekuIdle,
            animationSpeed: 1600,
            items: {
                helmet: {},
                armor: {},
                weapon: {}
            }
        },
        {
            role: 'dd',
            name: 'Memphis',
            hp: 2,
            damage: 3,
            atkSpeed: 2000,
            defence: 2,
            lvl: 1,
            id: Math.random(),
            key: 0,
            icon: memphisIcon,
            animation: memphisIdle,
            atck: memphisAtck,
            idle: memphisIdle,
            animationSpeed: 1700,
            items: {
                helmet: {},
                armor: {},
                weapon: {}
            }
        },
    ])

    let [user, setUser] = useState({
        immortalLastVisit: new Date(2022, 1, 8, 4, 0, 0, 0),
        gold: 0,
        lvl: 1,
        firstVisit: true,
        campaignLvl: 1,
        name: '',
        modalVision: false,
        modalText: 'something went wrong :,(',
        heroesPull: [
            {
                role: 'dd',
                name: 'Kaori',
                hp: 5,
                damage: 3,
                atkSpeed: 3000,
                defence: 2,
                lvl: 1,
                id: Math.random(),
                key: 1,
                icon: whitchIcon,
                animation: witchIdle,
                idle: witchIdle,
                atck: whitchAtck,
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
                name: 'Defcaleon',
                hp: 2,
                damage: 1,
                atkSpeed: 4500,
                defence: 10,
                icon: defcaleonIcon,
                animation: defcaleonIdle,
                idle: defcaleonIdle,
                atck: defcaleonAtck,
                animationSpeed: 1500,
                lvl: 1,
                id: Math.random(),
                key: 4,
                items: {
                    helmet: {},
                    armor: {},
                    weapon: {}
                }
            },
            {
                role: 'dd',
                name: 'Memphis',
                hp: 2,
                damage: 5,
                atkSpeed: 3000,
                defence: 2,
                lvl: 1,
                id: Math.random(),
                key: 2,
                icon: memphisIcon,
                animation: memphisIdle,
                atck: memphisAtck,
                idle: memphisIdle,
                animationSpeed: 1600,
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
        if (localStorage.getItem('heroes') !== null) {
            setHeroes(JSON.parse(localStorage.getItem('heroes')))
        }
        if (localStorage.getItem('gameAvailability') !== null) {
            setGameAvailability(JSON.parse(localStorage.getItem('gameAvailability')))
        }

        if (localStorage.getItem('user') !== null) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }else {
            if (user.firstVisit === true) {
                setUserName()
            }
        }
    }, []) //LOCAL STORE GET

    useEffect(() => {
        window.addEventListener("unload", () => {
            localStorage.setItem('heroes', JSON.stringify(heroes))
            localStorage.setItem('gameAvailability', JSON.stringify(gameAvailability))
            localStorage.setItem('user', JSON.stringify(user))
        })

    })//  LOCAL STORE SET

    const val = React.useRef('')

    function handleSubmit(event) {
        setUser({...user, name: val.current.value, firstVisit:false, modalText: 'game is in production mode, all sprites taken from printerest',modalVision: true})
        event.preventDefault()
    }

    function setUserName() {
        setUser({
            ...user, modalVision: true, modalText:
                <form onSubmit={e => handleSubmit(e)}>
                    <input ref={val} onInput={e => val.current.value = e.target.value}/>
                </form>
        })
    }

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

