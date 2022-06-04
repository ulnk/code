import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import loader from "@monaco-editor/loader";

import './index.css';
import { HiOutlineX } from 'react-icons/hi';
import { VscCircleFilled } from 'react-icons/vsc';

const startText =
`### Hello World!

* This is a list item
* This is another list item
    * This is a list inside a list`;

const Content = () => {
    const [maxWidth, setMaxWidth] = useState("100%");
    const [editor, setEditor] = useState(null);

    const dispatch = useDispatch();

    const intervalTime = useSelector(state => state.app.intervalTime);
    const allOpenTabs = useSelector(state => state.app.openTabs);
    const activeFilePath = useSelector(state => state.editor.activeFilePath);

    useEffect(() => {
        loader.init().then(monaco => {
            const wrapper = document.getElementById("editor");
            wrapper.innerHTML = "";
            const properties = {
                value: startText,
                language: "markdown",
                theme: "vs-dark",
                minimap: {
                    enabled: false
                },
            }

            setEditor(monaco.editor.create(wrapper, properties));
        });
    }, []);

    useEffect(() => {
        const checkSize = setInterval(() => {
            if (!editor) return;

            const width = document.body.clientWidth - 270;
            const absoluteWidth = editor.getDomNode().clientWidth;
            if (absoluteWidth > width) setMaxWidth(width);
            if (absoluteWidth < width) setMaxWidth("100%");
            editor.layout();
        }, intervalTime);

        return () => clearInterval(checkSize);
    }, [editor, intervalTime]);

    useEffect(() => {
        if (!editor) return;
        dispatch({ type: "SET_EDITOR", payload: editor });
    }, [editor, dispatch]);

    const handleKeyboardInput = useCallback(e => {
        if (!editor) return;
        const editorContainer = editor.getDomNode();
        if (!editorContainer.contains(e.target)) return;
        dispatch({ type: "UNSAVED_WORK", payload: activeFilePath });
    }, [editor, activeFilePath, dispatch]);


    useEffect(() => {
        document.addEventListener("keydown", handleKeyboardInput);
        return () => document.removeEventListener("keydown", handleKeyboardInput);
    }, [handleKeyboardInput]);

    return (
        <nav className="content">
            <div id="tabs" className={`content-tabs ${allOpenTabs.length > 0 && 'show'}`}>
                {
                    allOpenTabs.map((tab, i) => {
                        return (
                            <div key={i} className={`content-tab ${activeFilePath === tab.path && 'selected'}`}>
                                <span onClick={() => {
                                    dispatch({ type: 'TEMP_SAVE_PREVIOUS_WORK', payload: { path: activeFilePath, content: editor.getValue() } });
                                    dispatch({ type: 'SET_ACTIVE_FILE_PATH', payload: tab.path });
                                    editor.getModel().setValue(tab.content);
                                }}  className="content-tab-title">{tab.name}</span>
                                <div onClick={() => {
                                    dispatch({ type: 'CLOSE_TAB', payload: tab.path });
                                    if (!allOpenTabs[i - 1]) return;
                                    dispatch({ type: 'SET_ACTIVE_FILE_PATH', payload: allOpenTabs[i - 1].path });
                                    editor.getModel().setValue(allOpenTabs[i - 1].content);
                                }} className="content-tab-close-container">
                                    <div className="content-tab-close"><HiOutlineX /></div>
                                    {!tab.saved && <div className="hide"><VscCircleFilled /></div>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div id="editor" className={`content-editor ${activeFilePath !== null && 'show'}`} style={{ 'maxWidth':  maxWidth }}>

            </div>
        </nav>
    );
}

export default Content;