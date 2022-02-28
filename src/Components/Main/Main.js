import React from 'react';
import Heroes from "../Footer/Heroes";
import Map from "../Footer/Map";
import Store from "../Footer/store/Store";
import {Routes, Route} from 'react-router-dom'

const Main = (props) => {
    return (
        <div className='main'>
            <Routes>
                <Route path='/Store' element={Store(props)}/>
                <Route path='/Map' element={Map(props)}/>
                <Route path='/Heroes' element={Heroes(props)}/>
            </Routes>
        </div>
    );
};

export default Main;