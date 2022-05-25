const ui = (state = {}, action) => {
    if (action.type === 'APP_UI') {
        return action.payload
    } else {
        return state
    }
}

export default ui