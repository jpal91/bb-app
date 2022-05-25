let obj = {
    id: '',
    name: '',
    emails: '',
    emailsObj: {},
    subject: '',
    message: '',
    copy: true,
    userEmail: '',
    vidRef: {},
}

export default (state = obj, action) => {
    if (action.type === 'OPTIONS') {
        return action.payload
    } else {
        return state
    }
}