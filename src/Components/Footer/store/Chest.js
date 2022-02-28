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
        const drop = gameAvailability[type][entToTake]

        switch (type) {
            case 'heroes':
                setUser({
                    ...user, heroesPull: user.heroesPull.concat(drop),
                    modalVision: true,
                    modalText: `You got new hero ${drop.name}, check your heroes`,
                    gold:user.gold-100
                })
                break;
            case 'items':

                setUser({
                    ...user, itemsStore: user.itemsStore.concat(drop),
                    modalVision: true,
                    gold:user.gold-100,
                    modalText: `You got new item ${Object.entries(drop)[0][1].name}, check your inventory`
                })
                break;
        }

        gameAvailability[type] = gameAvailability[type].filter(arg => arg !== gameAvailability[type][entToTake])
        if (gameAvailability[type].length == 0) {
            delete gameAvailability[type]

        }

        setGameAvailability({...gameAvailability})


    }


    return (
        <div className='chest' onClick={open}>
        </div>
    );
};

export default Chest;