export default (state={}, action) => {
    if (action.type === 'USER_INFO') {
        return action.payload
    } else {
        return state
    }
}