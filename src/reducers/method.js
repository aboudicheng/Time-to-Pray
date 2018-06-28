import { SET_METHOD } from '../constants/action_types';

export default function method(state = 2, action) {
    switch (action.type) {
        case SET_METHOD:
            return action.method;
        default:
            return state;
    }
}