import React from 'react';
import './index.css';

import { VscFiles, VscSearch, VscGitMerge, VscDebugAlt, VscExtensions, VscSettingsGear, VscAccount } from 'react-icons/vsc';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebar-button selected"><VscFiles /></div>
            <div className="sidebar-button"><VscSearch /></div>
            <div className="sidebar-button"><VscGitMerge /></div>
            <div className="sidebar-button"><VscDebugAlt /></div>
            <div className="sidebar-button"><VscExtensions /></div>

            <div className="sidebar-bottom-buttons">
                <div className="sidebar-button"><VscSettingsGear /></div>
                <div className="sidebar-button"><VscAccount /></div>
            </div>
        </nav>
    );
}

export default Sidebar;