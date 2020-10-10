import { Dispatch } from 'redux';
import { LessActionsTypes } from './actionsTypes';
import API from './api';


export interface Action {
    textAction: Function
}
export const textAction = (params: any) => {
    return (dispatch: Dispatch) => {
        API.getText(params).then((res) => {
            dispatch({
                type: LessActionsTypes.SELECT_OPTIONS,
                payload: res
            })
        })
    }
}

