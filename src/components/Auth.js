import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { connect } from 'react-redux'

import { setUser } from "../actions";
import { useLocation } from "react-router-dom";

// const api = axios.create({
//     proxy: {
//         protocol: "http",
//         host: "localhost",
//         port: 3001,
//     }
// })

const Auth = (props) => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    const renderLoading = () => {
        if (loading) {
            return (
                <div>Loading...</div>
            )
        } else if (!loading) {
            return (
                <Outlet />
            )
        }
    }

    const refreshToken = async (id) => {
        await axios.get('http://localhost:3001/api/refresh-auth', { withCredentials: true }).then((result) => props.setUser(result.data))

        setLoading(false)
        navigate('/app')
        return
    }
    
    useEffect(() => {
        
        const auth = async () => {
            const response = await axios.get('http://localhost:3001/api/check-auth', { withCredentials: true})

            if (response.data === 'Dunno man') {
                setLoading(false)
                navigate('/login')
                return
            } else {
                
                const { expires } = response.data
                let now = new Date()

                if (now >= new Date(expires)) {
                    await refreshToken(response.data.id)
                }

                props.setUser(response.data)
                setLoading(false)
                navigate('/app')
                return
                
            }

        }

        if (!props.user.id && location.pathname !== '/login' && location.pathname !== '/getAuth') {
            auth()
        } else {
            setLoading(false)
        }


    })

    useEffect(() => {
        if (!props.user.id) {
            return
        }

        let now = new Date()
        let expires = new Date(props.user.expires)

        if (now >= expires) {
            setLoading(true)
            refreshToken(props.user.id)
        }

    }, [location.pathname])

    useEffect(() => {
        renderLoading()
    }, [loading])

    return (
        <React.Fragment>
            {renderLoading()}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { setUser })(Auth)