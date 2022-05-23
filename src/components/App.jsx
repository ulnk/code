import React from 'react';
import isElectron from '../hooks/isElectron';

import Electron from './electron';
import Sidebar from './sidebar';
import Explorer from './explorer';
import Content from './content';

const App = () => {
    return (
        <>
            {isElectron() && <Electron />}
            <div className="inner-body"> 
                <Sidebar />
                <Explorer />
                <Content />
            </div>
            <footer>
                <div className="left"></div>
                <div className="right"></div>
            </footer>
        </>
    );
}

export default App;