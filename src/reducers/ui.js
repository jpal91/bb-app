export default (state = {}, action) => {
    if (action.type === 'APP_UI') {
        return action.payload
    } else {
        return state
    }
}