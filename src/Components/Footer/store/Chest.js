import React from 'react';


const Chest = (props) => {
    let user = props.state.user
    let setUser = props.state.setUser

    function open() {
        let prevEnt = user.gold
        setUser({...user, gold: prevEnt + 100})
    }

    return (
        <div className='chest' onClick={open}>
        </div>
    );
};

export default Chest;