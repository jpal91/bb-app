import { combineReducers } from "redux";

import user from './user'
import email from './email'
import ui from './ui'
import videos from './videos'
import options from './options'

export default combineReducers({
    user: user,
    email: email,
    ui: ui,
    videos: videos,
    options: options
})