import { SET_PERIOD } from '../constants/action_types';

export default function period(state = 0, action) {
    switch (action.type) {
        case SET_PERIOD:
            return action.period;
        default:
            return state;
    }
}