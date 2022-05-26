import React, { useEffect, useState } from 'react';

import './index.css';
import { VscEllipsis, VscChevronDown, VscChevronRight } from 'react-icons/vsc';

const Explorer = () => {
    const [workspaceCollapsed, setWorkspaceCollapsed ] = useState(false);
    const [outlineCollapsed, setOutlineCollapsed] = useState(true);
    const [timelineCollapsed, setTimelineCollapsed] = useState(true);

    const [numWorkspaceItems, setNumWorkspaceItems] = useState(0);

    useEffect(() => {
        setNumWorkspaceItems(5);
    }, []);

    return (
        <nav className="explorer">
            <div className="explorer-header">
                <span className="explorer-header-title">EXPLORER</span>
                <span className="explorer-header-more"><VscEllipsis /></span>
            </div>
            <div className="explorer-category-container">
                <div onClick={() => setWorkspaceCollapsed(x => !x)} className="explorer-category-header">
                    { !workspaceCollapsed ? <VscChevronDown /> : <VscChevronRight /> }
                    <span>WORKSPACE</span>
                </div>
                <div style={{ 'height': `${numWorkspaceItems * 1.375}rem` }} className={`explorer-category-content ${workspaceCollapsed && 'hidden'}`}> 
                    <div className="explorer-content-folder" >
                        <VscChevronRight />
                        <span className="explorer-content-folder-name">src</span>
                    </div>
                    <div className="explorer-content-file" >
                        <span className="explorer-content-file-name">.gitignore</span>
                    </div>
                    <div className="explorer-content-file selected" >
                        <span className="explorer-content-file-name">README.md</span>
                    </div>
                    <div className="explorer-content-file" >
                        <span className="explorer-content-file-name">package.json</span>
                    </div>
                    <div className="explorer-content-file" >
                        <span className="explorer-content-file-name">yarn.lock</span>
                    </div>
                </div> 
            </div>
            <div className="explorer-category-container">
                <div onClick={() => setOutlineCollapsed(x => !x)} className="explorer-category-header">
                { !outlineCollapsed ? <VscChevronDown /> : <VscChevronRight /> }
                    <span>OUTLINE</span>
                </div>
                <div className={`explorer-category-content ${outlineCollapsed && 'hidden'}`}>

                </div> 
            </div>
            <div className="explorer-category-container">
                <div onClick={() => setTimelineCollapsed(x => !x)} className="explorer-category-header">
                { !timelineCollapsed ? <VscChevronDown /> : <VscChevronRight /> }
                    <span>TIMELINE</span>
                </div>
                <div className={`explorer-category-content ${timelineCollapsed && 'hidden'}`}>

                </div> 
            </div>
        </nav>
    );
}

export default Explorer;