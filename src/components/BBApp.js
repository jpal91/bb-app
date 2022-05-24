import { Button, Typography, Grid, Card, CardHeader, CardContent, CardMedia, Checkbox, Container, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { connect } from 'react-redux'
import axios from "axios"
import React, { useState, useEffect } from 'react'

import { appUserInfo, getVideos, setOptions } from "../actions"


const BBApp = (props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [hidden, setHidden] = useState(false)
    const [vid, setVid] = useState({})
    const [checked, setChecked] = useState(true)
    const [emails, setEmails] = useState('')
    
    const handleSubmit = (event) => {
        if (event.target.name === 'Reset') {
            setHidden(false)
            setVid('')
        } else {
            setHidden(true)
            let targVideo = props.videos.filter((video) => video.id === event.target.name)
            setVid(targVideo[0])
        }
    }

    const submitOptions = async () => {
        let emailObj = {}
        
        emails.split(',').forEach((e, i) => {
            emailObj[i] = e
        })
        
        let obj = {
            id: vid.id,
            name: vid.name,
            emails: emailObj,
            copy: checked
        }

        props.setOptions(obj)
        navigate('/confirm')
        
    }

    const renderOptions = () => {

        return (
            <Container fluid hidden={!hidden} sx={{m: 3}}>
                <Typography variant='h5'>ID: {vid.id || null}</Typography>
                <Typography variant='h5'>Name: {vid.name || null}</Typography>
                <Button variant='contained' name='Reset' onClick={(event) => handleSubmit(event)}>Reset</Button>
                <Card sx={{my: 2}}>
                    <CardMedia 
                        component='video'
                        src={vid.vidUrl}
                        controls
                        width='960'
                        height='540'
                    />
                </Card>
                <Typography variant='h6'>Emails</Typography>
                <TextField fullWidth multiline rows={4} value={emails} onChange={(event) => setEmails(event.target.value)}></TextField>
                <Checkbox checked={checked} onChange={() => setChecked(!checked)}/><Typography variant='h6' component='span'>Copy me?</Typography>
                <Button variant='contained' onClick={() => submitOptions()}>Confirm</Button>
            </Container>
        )
    }

    const renderVideos = () => {
        return props.videos.map((vid) => {
            return (
                <Grid item key={vid.id} sx={{m: 4}} hidden={hidden}>
                    <Card>
                        <CardHeader title= {vid.name}/>
                        <CardMedia 
                            component='img'
                            height='300'
                            width='200'
                            src={vid.thumbUrl}
                        />
                        <CardContent>
                            <Button variant='contained' name={`${vid.id}`} onClick={(event) => handleSubmit(event)}>
                                Select
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })
    }

    const render = () => {
        if (loading) {
            return <div>Loading...</div>
        } else if (!loading) {
            return (
            <React.Fragment>
                <Button variant='contained' onClick={() => navigate('/')}>Click</Button>
                <Button variant='contained'>Get User</Button>
                <Typography variant='h3'>Hi, {props.ui.firstName || null}</Typography>
                <Grid container sx={{display: 'flex'}}>
                    {renderVideos()}
                    {renderOptions()}
                </Grid>
            </React.Fragment>
            )
        }
    }

    useEffect(() => {
        if (!props.user.id) {
            return
        }
        
        if (loading) {
            props.appUserInfo(props.user.id)
            .then(() => {
                props.getVideos(props.user.id)
            })
            .then(() => {
                setLoading(false)
            })
        }
    }, [props.user])

    useEffect(() => {
        render()
    }, [loading])

    return (
        <div>
            {render()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        ui: state.ui,
        videos: state.videos
    }
}

export default connect(mapStateToProps, { appUserInfo, getVideos, setOptions })(BBApp)