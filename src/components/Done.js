import axios from "axios"
import React, { useState, useEffect } from 'react'
import { Box, Button, Container, LinearProgress, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { connect } from 'react-redux'
import api from '../api'

const Done = (props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const render = () => {
        
        if (loading) {
            
            return (
                <Container fluid sx={{height: 200, mt: 10 }}>
                    <LinearProgress />
                </Container>
            )
        } else if (!loading) {
            return (
                <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <Typography variant='h1'>Done</Typography>
                    <Typography variant='h3' sx={{mt: 5}}>taking you back home...</Typography>
                </Box>
            )
        }
    }

    useEffect(() => {
        const send = async () => {

            await api.post('/api/app/send-vid', {
                ...props.options,
                userId: props.user.id
            })
                .then(() => {
                    setLoading(false)
                })
            return
        }
        send()

        const wait = setTimeout(() => {
            navigate('/app')
        }, 3000)

        return () => {
            clearTimeout(wait)
        }
    }, [])

    // useEffect(() => {
    //     if (loading) {
    //         return 
    //     }

    //     const wait = setTimeout(() => {
    //         navigate('/confirm')
    //     }, 5000)

    //     return () => {
    //         clearTimeout(wait)
    //     }
    // }, [loading, navigate])

    return (
        <React.Fragment>
            {render()}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        options: state.options,
        user: state.user
    }
}

export default connect(mapStateToProps)(Done)