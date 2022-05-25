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

const options = (state = obj, action) => {
    if (action.type === 'OPTIONS') {
        return action.payload
    } else {
        return state
    }
}

export default options