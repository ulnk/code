import React, { useCallback, useEffect, useState } from 'react';
import './index.css';

import { HiOutlineX } from 'react-icons/hi';

import loader from "@monaco-editor/loader";

const startText =
`### Hello World!

* This is a list item
* This is another list item
    * This is a list inside a list`

const Content = () => {
    const [maxWidth, setMaxWidth] = useState("100%");
    const [editor, setEditor] = useState(null);
    const [intervalTime, setIntervalTime] = useState(10);

    useEffect(() => {
        loader.init().then(monaco => {
            const wrapper = document.getElementById("editor");
            const properties = {
                value: startText,
                language: "markdown",
                theme: "vs-dark",
                minimap: {
                    enabled: false
                }
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

    return (
        <nav className="content">
            <div id="tabs" className="content-tabs">
                <div className="content-tab">
                    <span className="content-tab-title">yarn.lock</span>
                    <div className="content-tab-close"><HiOutlineX /></div>
                </div>
                <div className="content-tab">
                    <span className="content-tab-title">package.json</span>
                    <div className="content-tab-close"><HiOutlineX /></div>
                </div>
                <div className="content-tab selected">
                    <span className="content-tab-title">README.md</span>
                    <div className="content-tab-close"><HiOutlineX /></div>
                </div>
            </div>
            <div id="editor" className="content-editor" style={{ 'maxWidth':  maxWidth }}>

            </div>
        </nav>
    );
}

export default Content;