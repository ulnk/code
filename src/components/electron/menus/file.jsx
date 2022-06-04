import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMonaco } from '@monaco-editor/react';

const FileContextMenu = (props) => {
    const contextMenuRef = useRef();
    const dispatch = useDispatch();

    const activeFilePath = useSelector(state => state.editor.activeFilePath);
    const editor = useSelector(state => state.editor.editor);

    const handleClick = useCallback((e) => {
        if  (!contextMenuRef.current.parentNode.contains(e.target)) props.setShow(false);
    }, [props]);

    useEffect(() => {
        if (!props.show) return;
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [props, handleClick]);

    useEffect(() => {
        if (!editor) return;
        console.log(editor);
    }, [editor]);

    return props.show && (
        <div ref={contextMenuRef} className="context-menu">
            <div onClick={async () => {
                const filePath = await window.app.fileDialog();
                if (!filePath) return;
                const fileContents = await window.app.readFile(filePath);
                dispatch({ type: 'ADD_TAB', payload: { name: filePath.replace(/^.*[\\]/, ''), path: filePath, content: fileContents, saved: true } });
                dispatch({ type: 'SET_ACTIVE_FILE_PATH', payload: filePath });
            }} className="context-menu-item">
                <span className='left'>Open File</span>
                <span className='right'>Ctrl+O</span>
            </div>
            <div onClick={async () => {
                const folderPath = await window.app.folderDialog();
                if (!folderPath) return;
                dispatch({ type: 'CHANGE_DIR', payload: folderPath });
            }} className="context-menu-item">
                <span className='left'>Open Folder</span>
                <span className='right'>Ctrl+K Ctrl+O</span>
            </div>
            <div className="divider"></div>
            <div onClick={async () => {
                console.log(editor)
                dispatch({ type: 'SAVED_WORK', payload: activeFilePath });
                window.app.saveFile(activeFilePath, editor.getValue());

                console.log(editor.getValue(), activeFilePath);
            }} className="context-menu-item">
                <span className='left'>Save</span>
                <span className='right'>Ctrl+S</span>
            </div>
            <div onClick={async () => {
                const saveAsPath = await window.app.saveDialog();
                if (!saveAsPath) return;
                const fileContents = editor.getValue();
                await window.app.saveFile(saveAsPath, fileContents);
                dispatch({ type: 'ADD_TAB', payload: { name: saveAsPath.replace(/^.*[\\]/, ''), path: saveAsPath, content: fileContents, saved: true } });
                dispatch({ type: 'SET_ACTIVE_FILE_PATH', payload: saveAsPath });
            }} className="context-menu-item">
                <span className='left'>Save As</span>
                <span className='right'>Ctrl+Shift+S</span>
            </div>
        </div>
    );
}

export default FileContextMenu;