import React from 'react';

import './index.css';
import logo from '../../assets/logo.png';

import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';

const Electron = () => {
    const handleCloseWindow = (e) => {
        e.preventDefault();
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.send('close');
    };

    const handleMinimiseWindow = (e) => {
        e.preventDefault();
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.send('minimise');
    };

    const handleRestoreWindow = (e) => {
        e.preventDefault();
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.send('restore');
    };

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
                <button onClick={handleMinimiseWindow} className="electron-menu-button"><VscChromeMinimize /></button>
                <button onClick={handleRestoreWindow} className="electron-menu-button"><VscChromeMaximize /></button>
                <button onClick={handleCloseWindow} className="electron-menu-button close"><VscChromeClose /></button>
            </div>
        </div>
    );
}

export default Electron;