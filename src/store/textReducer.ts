import { LessActionsTypes } from './actionsTypes';
export interface action {
    type: string,
    payload?: any
}
export interface initState {
    value: string,
    background: string
}
const initStates: initState = {
    value: '1',
    background: 'blue'
}
const textReducer = (initState: initState = initStates, actions: action) => {
    switch (actions.type) {
        case LessActionsTypes.SELECT_OPTIONS:
            return actions.payload
        case LessActionsTypes.SET_VALUES:
            return {...initState, ...actions.payload}
        default:
            return initState
    }
}
export { textReducer };