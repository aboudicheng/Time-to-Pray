import { SET_INPUT_FIELD } from '../constants/action_types';

export default function address(state = "", action) {
    switch (action.type) {
        case SET_INPUT_FIELD:
            return action.value;
        default:
            return state;
    }
}