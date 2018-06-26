import {
    SET_GEOLOCATION,
    SET_GEO_ERROR_MESSAGE,
    SET_PRAYER_ERROR_MESSAGE,
    SET_ISLOADING,
    SET_INPUT_FIELD,
    SET_METHOD,
    SET_PERIOD,
    SET_LANGUAGE
}
    from '../constants/action_types';

export const setGeolocation = coords => ({
    type: SET_GEOLOCATION,
    payload: coords
})

export const setGeoErrorMessage = error => ({
    type: SET_GEO_ERROR_MESSAGE,
    payload: error
})

export const setPrayerErrorMessage = errorMessage => ({
    type: SET_PRAYER_ERROR_MESSAGE,
    payload: errorMessage
})

export const setIsLoading = isLoading => ({
    type: SET_ISLOADING,
    payload: isLoading
})

export const setInputField = value => ({
    type: SET_INPUT_FIELD,
    payload: value
})

export const setMethod = value => ({
    type: SET_METHOD,
    payload: value
})

export const setPeriod = value => ({
    type: SET_PERIOD,
    payload: value
})

export const setLang = value => ({
    type: SET_LANGUAGE,
    payload: value
})