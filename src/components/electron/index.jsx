import React, { useState } from 'react';

import './index.css';
import logo from '../../assets/logo.png';

import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';

import FileContextMenu from './menus/file';
import EditContextMenu from './menus/edit';

const Electron = () => {
    const [showFileContextMenu, setShowFileContextMenu] = useState(false);
    const [showEditContextMenu, setShowEditContextMenu] = useState(false);
    // const [directorySafeName, setDirectorySafeName] = useState('');

    // const currentDirectory = useSelector(state => state.editor.currentDirectory);

    // useEffect(() => {
    //     let allDirectoryNames = currentDirectory.split('\\')
    //     setDirectorySafeName(allDirectoryNames[allDirectoryNames.length - 1]);
    // }, [currentDirectory]);

    return (
        <div className="electron-menu">
            <div className="electron-menu-left">
                <img className="electron-menu-left-img" src={logo} alt="Skid Studio Code Logo" />
                <div onClick={() => setShowFileContextMenu(x => !x)} className={`electron-menu-left-item ${showFileContextMenu && 'open'}`}>
                    <span>File</span>
                    <FileContextMenu show={showFileContextMenu} setShow={setShowFileContextMenu} />
                </div>
                <div onClick={() => setShowEditContextMenu(x => !x)} className={`electron-menu-left-item ${showEditContextMenu && 'open'}`}>
                    <span>Edit</span>
                    <EditContextMenu show={showEditContextMenu} setShow={setShowEditContextMenu} />
                </div>
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