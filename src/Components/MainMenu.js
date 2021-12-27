import React from 'react';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Links from "./Footer/Links";

const MainMenu = (props) => {
    return (
        <div className='wrapper'>
            <Header state={props}/>
            <Main state={props}/>
            <Links/>
        </div>
    );
};

export default MainMenu;