import { SET_ISLOADING } from '../constants/action_types'

export default function isLoading(state = true, action) {
    switch (action.type) {
        case SET_ISLOADING:
            return action.payload
        default:
            return state;
    }
}