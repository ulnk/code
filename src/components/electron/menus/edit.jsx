import React, { useCallback, useEffect, useRef } from 'react';

const EditContextMenu = (props) => {
    const contextMenuRef = useRef();

    const handleClick = useCallback((e) => {
        if  (!contextMenuRef.current.parentNode.contains(e.target)) props.setShow(false);
    }, [props]);

    useEffect(() => {
        if (!props.show) return;
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [props, handleClick]);

    return props.show && (
        <div ref={contextMenuRef} className="context-menu">
            <div className="context-menu-item">
                <span className='left'>Undo</span>
                <span className='right'>Ctrl+Z</span>
            </div>
            <div className="context-menu-item">
                <span className='left'>Redo</span>
                <span className='right'>Ctrl+Y</span>
            </div>
            <div className="divider"></div>
            <div className="context-menu-item">
                <span className='left'>Cut</span>
                <span className='right'>Ctrl+X</span>
            </div>
            <div className="context-menu-item">
                <span className='left'>Copy</span>
                <span className='right'>Ctrl+C</span>
            </div>
            <div className="context-menu-item">
                <span className='left'>Paste</span>
                <span className='right'>Ctrl+V</span>
            </div>
        </div>
    );
}

export default EditContextMenu;