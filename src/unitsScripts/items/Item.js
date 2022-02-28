import React, {useContext} from 'react';
import Context from "../../context";


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
        return Object.entries(item).map((stat) => {
            return <li>{stat[0]}: {stat[1]}</li>
        })
    }

    return (
        <div className='item'
             onMouseEnter={enterEvent}
             onMouseLeave={leaveEvent}
             onClick={itemTakeOn || itemTakeOff}>
            {item.name}
            <ul className='item__stats'>{showStats()}</ul>
        </div>
    );
};

export default Item;