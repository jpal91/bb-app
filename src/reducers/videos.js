const videos = (state = [], action) => {
    if (action.type === 'GET_VIDEOS') {
        return action.payload
    } else {
        return state
    }
}

export default videos