import React, {useContext} from 'react';
import map from "../../Components/Footer/Map";
import Context from "../../context";
import Modal from "../../Components/Modal";

const Item = ({item, itemTakeOn, itemTakeOff}) => {
    const context = useContext(Context)
    const [user, setUser] = [context.user, context.setUser]
    const [heroes, setHeroes] = [context.heroes, context.setHeroes]

    function enterEvent(event) {
        event.currentTarget.lastChild.style.display = 'block'
    }

    function leaveEvent(event) {
        event.currentTarget.lastChild.style.display = 'none'
    }

    function showStats() {
        for (let stat in item) {
            return (Object.entries(item[stat]).map((item) => {
                    return <li key={Math.random()}>{item[0] + ':' + item[1]}</li>
                })
            )
        }
    }


    return (
        <div className='item'
             onMouseEnter={enterEvent}
             onMouseLeave={leaveEvent}
             onClick={itemTakeOn || itemTakeOff}>
             {Object.keys(item)[0]}
            <ul className='item__stats'>{showStats()}</ul>
        </div>
    );
};

export default Item;