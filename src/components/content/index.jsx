import React from 'react';

import './index.css';

import Editor, { loader } from "@monaco-editor/react";

loader.config({
  paths: {
    vs: "./node_modules/monaco-editor/min/vs"
  }
});


const Content = () => {
    return (
        <nav className="content">
            <div className="content-tabs"></div>
            <div className="content-editor">
                <Editor />
            </div>
        </nav>
    );
}

export default Content;