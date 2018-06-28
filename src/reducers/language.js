import { SET_LANGUAGE } from '../constants/action_types';

export default function period(state = 0, action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return action.lang;
        default:
            return state;
    }
}