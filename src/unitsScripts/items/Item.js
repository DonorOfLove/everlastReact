import React, {useContext} from 'react';
import map from "../../Components/Footer/Map";
import Context from "../../context";

const Item = (props) => {
    const context = useContext(Context)
    const [user, setUser] = [context.user, context.setUser]
    const [heroes,setHeroes]=[context.heroes,context.setHeroes]
    let hero = props.hero
    const items = props.stats

    function enterEvent(event) {
        event.currentTarget.lastChild.style.display = 'block'
    }

    function leaveEvent(event) {
        event.currentTarget.lastChild.style.display = 'none'
    }

    function itemTakeOn() {
        console.log(items)

//         setHeroes({...heroes, hero: {items}:items})

    }

//ПЕРЕДАЮТСЯ ВСЕ ШМОТКИ, А НЕ ОДНА

    function showStats() {
        for (let item in items) {
            return (Object.entries(items[item]).map((items) => {
                    return <li key={Math.random()}>{items[0] + ':' + items[1]}</li>
                })
            )
        }
    }


    return (
        <div className='item'
            onMouseEnter={enterEvent}
             onMouseLeave={leaveEvent}
             onClick={itemTakeOn}
            >
            {Object.keys(items)[0]}
            <ul className='item__stats'>{showStats()}</ul>
        </div>
    );
};

export default Item;