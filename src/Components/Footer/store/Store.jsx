import React from 'react';
import Chest from "./Chest";
import Context from "../../../context";
const Store = (props) => {
    const context = React.useContext(Context)
    const [user, setUser] = [context.user, context.setUser]

    return (
        <div className='store'>
            {(user.gold>99)? <Chest state={props.state}/>:<div className='chest'>100g</div>}

        </div>
    );
};

export default Store;