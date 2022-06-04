import React from 'react';
import isElectron from '../hooks/isElectron';

import Electron from './electron';
import Sidebar from './sidebar';
import Explorer from './explorer';
import Content from './content';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const App = () => { 
    return (
        isElectron() ? <>
            <Provider store={store}>
                <Electron />
                <div className="inner-body">
                    <Sidebar />
                    <Explorer />
                    <Content />
                </div>
                <footer>
                    <div className="left"></div>
                    <div className="right"></div>
                </footer>
            </Provider>
        </> : <>
            <div className="no-electron">
                <span className='big'>Skid Studio Code</span>
                <span className='small'>Please run in the Desktop App!</span>
            </div>
        </>
    );
}

export default App;