import { SET_GEO_ERROR_MESSAGE, SET_PRAYER_ERROR_MESSAGE } from '../constants/action_types';
export function error(state = "", action) {
    switch (action.type) {
        case SET_GEO_ERROR_MESSAGE:
            return action.error
        default:
            return state;
    }
}

export function errorMessage(state = "", action) {
    switch (action.type) {
        case SET_PRAYER_ERROR_MESSAGE:
            return action.errorMessage
        default:
            return state;
    }
}