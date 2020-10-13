import { combineReducers } from 'redux';
import undoable, { includeAction, excludeAction } from 'redux-undo';
import {textReducer} from './textReducer';
import { Action } from './actions'
let Store = combineReducers({
    textReducer: undoable(textReducer, {filter: includeAction(['SELECT_OPTIONS'])})
})

export default Store;