import React, { useState } from 'react';

import './index.css';
import { VscEllipsis, VscChevronDown, VscChevronRight } from 'react-icons/vsc';

const Explorer = () => {
    const [workspaceCollapsed, setWorkspaceCollapsed ] = useState(true);
    const [outlineCollapsed, setOutlineCollapsed] = useState(true);
    const [timelineCollapsed, setTimelineCollapsed] = useState(true);

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
                <div className={`explorer-category-content ${workspaceCollapsed && 'hidden'}`}> 
                    <div className="test"></div>
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