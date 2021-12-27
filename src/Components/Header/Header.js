import React from 'react';

const Header = (props) => {
    const user=props.state.user
    return (
        <header className='header'>
         <div>{user.name+' lvl:'+user.lvl}</div>
           <div>gold:{user.gold}</div>
        </header>
    );
};

export default Header;