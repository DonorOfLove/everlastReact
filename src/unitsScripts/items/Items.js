import React from 'react';
import Context from "../../context";

import Item from "./Item";

const Items = (props) => {
    const context = React.useContext(Context)
    const [user, setUser] = [context.user, context.setUser]

    function openModal(type) {
        const filteredItems = user.itemsStore.filter(target => type in target)
        setUser({
            ...user, modalVision: true,
            modalText: filteredItems.map((item) => {
                return (<Item key={Math.random()}
                              stats={item}
                              hero={props.hero}/>)
            })
        })
    }


    return (
        <div>

            <div onClick={(e) => {
                e.stopPropagation()
                openModal('helmet')
            }}>+
            </div>
            <div>arm</div>
            <div>weap</div>
        </div>
    );
};

export default Items;