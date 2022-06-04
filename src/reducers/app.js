const initialState = () => {
    return {
        intervalTime: 10,
        openTabs: [
            // {
            //     fileName: 'index.js',
            //     path: `C:\\Users\\${window.app.username}\\Documents\\GitHub\\code\\src\\index.js`,
            //     selected: false
            // }
        ],
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'SET_INTERVAL_TIME':
            return { ...state, intervalTime: action.payload }
        case 'ADD_TAB':
            const foundTab = state.openTabs.find(tab => tab.path === action.payload.path);
            if (foundTab) return state;
            return { ...state, openTabs: [ ...state.openTabs, action.payload ]}
        case 'CLOSE_TAB':
            return { ...state, openTabs: state.openTabs.filter(tab => tab.path !== action.payload) }
        case 'UNSAVED_WORK':
            const unsavedTab = state.openTabs.find(tab => tab.path === action.payload);
            if (!unsavedTab) return state;
            unsavedTab.saved = false;
            return { ...state, openTabs: [ ...state.openTabs ]}
        case 'SAVED_WORK':
            const savedTab = state.openTabs.find(tab => tab.path === action.payload);
            if (!savedTab) return state;
            savedTab.saved = true;
            return { ...state, openTabs: [ ...state.openTabs ]}
        case 'TEMP_SAVE_PREVIOUS_WORK':
            const newTabs = [];

            state.openTabs.map(tab => {
                if (tab.path === action.payload.path) return newTabs.push({ ...tab, content: action.payload.content });
                return newTabs.push(tab);
            })

            console.log(newTabs);

            return {
                ...state,
                openTabs: newTabs
            }
        default:
            return state;
    }
}