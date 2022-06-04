import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { VscEllipsis, VscChevronDown, VscChevronRight } from 'react-icons/vsc';

const Explorer = () => {
    const [workspaceCollapsed, setWorkspaceCollapsed ] = useState(false);
    const [outlineCollapsed, setOutlineCollapsed] = useState(true);
    const [timelineCollapsed, setTimelineCollapsed] = useState(true);
    const [allFiles, setAllFiles] = useState([]);
    const dispatch = useDispatch();

    const currentPath = useSelector(state => state.editor.currentDirectory);
    const activeFilePath = useSelector(state => state.editor.activeFilePath);
    const editor = useSelector(state => state.editor.editor);

    const checkDirectory = useCallback(() => {
        setAllFiles(window.app.getFiles(currentPath));
    }, [currentPath]);

    useEffect(() => {
        const checkFileInterval = setInterval(checkDirectory, 100);
        return () => clearInterval(checkFileInterval);
    }, [checkDirectory]);

    return (
        <nav className="explorer">
            <div className="explorer-header">
                <span className="explorer-header-title">EXPLORER</span>
                <span className="explorer-header-more"><VscEllipsis /></span>
            </div>
            {/* <input type="text" value={currentPath} onChange={(e) => setCurrentPath(e.target.value)} /> */}
            <div className="explorer-category-container">
                <div onClick={() => setWorkspaceCollapsed(x => !x)} className="explorer-category-header">
                    { !workspaceCollapsed ? <VscChevronDown /> : <VscChevronRight /> }
                    <span>WORKSPACE</span>
                </div>
                <div style={{ 'height': `${allFiles.length * 1.375}rem` }} className={`explorer-category-content ${workspaceCollapsed && 'hidden'}`}> 
                    {
                        allFiles.map((file, i) => {
                            return file.isFile ? (
                                <div onClick={async () => {
                                    const fileContents = await window.app.readFile(file.path);
                                    editor.getModel().setValue(fileContents);
                                    dispatch({ type: 'SET_ACTIVE_FILE_PATH', payload: file.path });
                                    dispatch({ type: 'ADD_TAB', payload: { name: file.path.replace(/^.*[\\]/, ''), path: file.path, content: fileContents, saved: true } });
                                }} className={`explorer-content-file ${activeFilePath === file.path && 'selected'}`} key={i} >
                                    <span className="explorer-content-file-name">{file.name}</span>
                                </div>
                            ) : (
                                <div className="explorer-content-folder" key={i}>
                                    <VscChevronRight />
                                    <span className="explorer-content-folder-name">{file.name}</span>
                                </div>
                            )
                        })
                    }
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