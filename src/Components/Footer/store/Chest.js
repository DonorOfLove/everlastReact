import React, {useContext} from 'react';
import Context from "../../../context";
import {logDOM} from "@testing-library/react";


const Chest = (props) => {

    const context = useContext(Context)
    const [heroes, setHeroes] = [context.heroes, context.setHeroes]
    const [user, setUser] = [context.user, context.setUser]
    const [gameAvailability, setGameAvailability] = [context.gameAvailability, context.setGameAvailability]

    function open() {
        const randomInt = Math.floor(Math.random() * Object.keys(gameAvailability).length)
        const type = Object.entries(gameAvailability)[randomInt][0]
        const entToTake = Math.floor(Math.random() * gameAvailability[type].length)
        if (gameAvailability[type][entToTake]==undefined){
            console.log('s')
            open()
        }else {
            switch (type) {
                case 'heroes':
                    setUser({...user, heroesPull: user.heroesPull.concat(gameAvailability[type][entToTake])})
                    break;
                case 'items':
                    setUser({...user, itemsStore: user.itemsStore.concat(gameAvailability[type][entToTake])})
                    break;
            }
            gameAvailability[type] = gameAvailability[type].filter(arg => arg !== gameAvailability[type][entToTake])
            console.log(entToTake)
            setGameAvailability({...gameAvailability})
            let prevEnt = user.gold
            // setUser({...user, gold: prevEnt - 100})
            showDrop(gameAvailability[type][entToTake])
        }

    }
    function showDrop(drop) {
        console.log(drop)
    }

    return (
        <div className='chest' onClick={open}>
        </div>
    );
};

export default Chest;