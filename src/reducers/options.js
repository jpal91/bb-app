export default (state = {}, action) => {
    if (action.type === 'OPTIONS') {
        return action.payload
    } else {
        return state
    }
}