import React, { useEffect } from "react";

import CircularProgress from '@mui/material/CircularProgress'
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logOut } from '../actions'


const Logout = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        props.logOut()
            .then(() => {
                navigate('/login')
            })
    },[])

    return (
        <React.Fragment>
            <CircularProgress />
        </React.Fragment>
    )
}

export default connect(null, { logOut })(Logout)