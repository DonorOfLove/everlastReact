import React from 'react';
import Context from "../../context";

import Item from "./Item";


const Items = (props) => {

    const context = React.useContext(Context)
    const [user, setUser] = [context.user, context.setUser]
    const [heroes, setHeroes] = [context.heroes, context.setHeroes]
    let hero = props.hero

    function isEmpty(obj) {
        for (let key in obj) {
            return true
        }
        return false
    }

    function openModal(type) {
        const filteredItems = user.itemsStore.filter(target => type in target)
        setUser({
            ...user, modalVision: true,
            modalText: filteredItems.map((item) => {
                return (<Item key={Math.random()}
                              item={Object.entries(item)[0][1]}
                              hero={hero}
                              itemTakeOn={() => itemTakeOn(item, hero)}
                />)
            })
        })
    }

    function itemTakeOff(item, hero) {
        let type = item[0]
        hero.items[type]={}
        let newItem= new Object()
        newItem[type]=item[1]
        setUser({...user,itemsStore:user.itemsStore.push(newItem)})
        setHeroes([...heroes],hero)
    }

    function itemTakeOn(item, hero) {
        let type = Object.keys(item)[0]
        hero.items[type] = Object.values(item)[0]
        setHeroes([...heroes], {hero})
        setUser({...user, itemsStore: user.itemsStore.filter(arg => arg !== item), modalVision: false})
    }

    return (
        <div>
            {Object.entries(hero.items).map((item) => {
                return (
                    <div onClick={(e) => {
                        e.stopPropagation()
                        openModal(item[0])}}>
                        {isEmpty(item[1]) ? <Item key={Math.random()}
                                                  item={item[1]}
                                                  hero={hero}
                                                  itemTakeOff={() => itemTakeOff(item, hero)}/> :
                            <div className='item'>+</div>}
                    </div>)
            })}
        </div>
    );
};

export default Items;