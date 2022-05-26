import React from 'react';

import './index.css';
import logo from '../../assets/logo.png';

import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';

const Electron = () => {
    return (
        <div className="electron-menu">
            <div className="electron-menu-left">
                <img className="electron-menu-left-img" src={logo} alt="Skid Studio Code Logo" />
                <span className="electron-menu-left-item">File</span>
                <span className="electron-menu-left-item">Edit</span>
                <span className="electron-menu-left-item">Selection</span>
                <span className="electron-menu-left-item">View</span>
                <span className="electron-menu-left-item">Terminal</span>
                <span className="electron-menu-left-item">Help</span>
            </div>
            <span className="electron-menu-name">Skid Studio Code</span>
            <div className="electron-menu-right">
                <button onClick={window.app.minimise} className="electron-menu-button"><VscChromeMinimize /></button>
                <button onClick={window.app.restore} className="electron-menu-button"><VscChromeMaximize /></button>
                <button onClick={window.app.close} className="electron-menu-button close"><VscChromeClose /></button>
            </div>
        </div>
    );
}

export default Electron;