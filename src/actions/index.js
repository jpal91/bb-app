import axios from "axios"

export const setUser = (obj) => {
    return { type: 'USER_INFO', payload: obj }
}

export const setEmail = (str) => {
    return { type: 'USER_EMAIL', payload: str }
}

export const appUserInfo = (id) => async (dispatch) => {
    const response = await axios.post('http://localhost:3001/api/app/user', {
        id: id
    })

    return dispatch({ type: 'APP_UI', payload: response.data })
}

export const getVideos = (id) => async (dispatch) => {
    const response = await axios.post('http://localhost:3001/api/app/videos', {
        id: id
    })

    return dispatch({ type: 'GET_VIDEOS', payload: response.data.videos })
} 

export const setOptions = (obj) => {
    return { type: 'OPTIONS', payload: obj }
}