import { SET_GEOLOCATION } from '../constants/action_types'
export default function geolocation(state = null, action) {
    switch (action.type) {
        case SET_GEOLOCATION:
            return action.payload;
        default:
            return state;
    }
}