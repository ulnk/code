const initialState = () => {
    return {
        editor: null,
        currentDirectory: `C:\\Users\\${window.app.username}\\Documents`,
        activeFilePath: null
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'CLOSE_TAB':
            return { ...state, activeFilePath: null }
        case 'SET_EDITOR':
            return { ...state, editor: action.payload }
        case 'CHANGE_DIR':
            return { ...state, currentDirectory: action.payload };
        case 'SET_ACTIVE_FILE_PATH':
            return { ...state, activeFilePath: action.payload };
        default:
            return state;
    }
}