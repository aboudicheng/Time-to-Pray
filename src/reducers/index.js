import geolocation from './geolocation'
import { error, errorMessage } from './errorMessage'
import isLoading from './isLoading'
import address from './setInputField'
import method from './method'
import period from './period'
import language from './language'
import { combineReducers } from "redux";

export default combineReducers({
    geolocation,
    error,
    errorMessage,
    isLoading,
    address,
    method,
    period,
    language
})