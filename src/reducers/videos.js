export default (state = [], action) => {
    if (action.type === 'GET_VIDEOS') {
        return action.payload
    } else {
        return state
    }
}