const email = (state = '', action) => {
    if (action.type === 'USER_EMAIL') {
        return action.payload
    } else {
        return state
    }
}

export default email