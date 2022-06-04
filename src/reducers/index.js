import { combineReducers } from 'redux';

import editor from './editor';
import app from './app';

export default combineReducers({
    editor, app
});