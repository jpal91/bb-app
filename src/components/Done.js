import axios from "axios"
import React, { useState, useEffect } from 'react'
import { Box, Button, Container, LinearProgress, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { connect } from 'react-redux'

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
                <Box sx={{display: 'flex'}}>
                    <Typography variant='h1'>Done</Typography>
                </Box>
            )
        }
    }

    useEffect(() => {
        const send = async () => {

            await axios.post('http://localhost:3001/api/app/send-vid', {
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
            navigate('/confirm')
        }, 5000)

        return () => {
            clearTimeout(wait)
        }
    }, [])

    useEffect(() => {
        if (loading) {
            return 
        }

        const wait = setTimeout(() => {
            navigate('/confirm')
        }, 5000)

        return () => {
            clearTimeout(wait)
        }
    }, [loading])

    return (
        <React.Fragment>
            <Button variant='contained' onClick={() => navigate('/confirm')}>Go Back</Button>
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