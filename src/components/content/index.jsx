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
    const [editor, setEditor] = useState(null);

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

            console.log(require('../../assets/theme.json'));

            setEditor(monaco.editor.create(wrapper, properties));
            monaco.editor.defineTheme("skid", {
                colors: {
                    "editor.background": "#282C34",
                }
            })
        });
    }, []);

    const handleResize = useCallback(() => {
        console.log(document.querySelector("#editor").offsetWidth)
        if (editor !== null) editor.layout();
    }, [editor]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [editor, handleResize]);

    return (
        <nav className="content">
            <div className="content-tabs">
                <div className="content-tab">
                    <span className="content-tab-title">yarn.lock</span>
                    <div className="content-tab-close"><HiOutlineX /></div>
                </div>
                <div className="content-tab selected">
                    <span className="content-tab-title">README.md</span>
                    <div className="content-tab-close"><HiOutlineX /></div>
                </div>
            </div>
            <div id="editor" className="content-editor">

            </div>
        </nav>
    );
}

export default Content;