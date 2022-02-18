import React from 'react';
import Context from "../../context";

import Item from "./Item";


const Items = (props) => {
    const context = React.useContext(Context)
    const [user, setUser] = [context.user, context.setUser]
    const [heroes, setHeroes] = [context.heroes, context.setHeroes]
    let hero = props.hero


    function isEmpty(obj) {
        for (let key in Object.entries(obj)[0][1]) {
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
                              item={item}
                              hero={hero}
                              itemTakeOn={() => itemTakeOn(item, hero)}
                />)
            })
        })
    }

    function itemTakeOff(item, hero) {
        console.log(Object.keys(item)[0])
        console.log(hero.items)
        console.log(Object.keys(hero.items))
    }

    function itemTakeOn(item, hero) {
        hero.items = [item]
        // ИСПРАВИТЬ, ^^^^^^ потому что все шмотки меняются на выбранную
        setHeroes([...heroes], {hero})
        let newItems = user.itemsStore.filter(arg => arg !== item)
        setUser({...user, itemsStore: newItems, modalVision: false})
        console.log('s')
    }

    return (
        <div>
            {hero.items.map((item) => {
                return <div
                    onClick={(e) => {
                        e.stopPropagation()
                        openModal(Object.keys(item))
                    }}>
                    {isEmpty(item) ? <Item key={Math.random()}
                                           item={item}
                                           hero={hero}
                                           itemTakeOff={() => itemTakeOff(item, hero)}/> :
                        <div>+</div>}
                </div>
            })}
        </div>
    );
};

export default Items;