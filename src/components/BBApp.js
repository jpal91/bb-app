import {
    Button,
    Typography,
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Checkbox,
    Container,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { appUserInfo, getVideos, setOptions, logOut } from "../actions";
import SimplePopper from "./SimplePopper";

const BBApp = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [hidden, setHidden] = useState(false);
    const [vid, setVid] = useState(props.options.vidRef);
    const [checked, setChecked] = useState(true);
    const [emails, setEmails] = useState(props.options.emails);
    const [subject, setSubject] = useState(props.options.subject);
    const [message, setMessage] = useState(props.options.message);

    const handleSubmit = (event) => {
        if (event.target.name === "Reset") {
            setHidden(false);
            setVid({});
            setSubject("");
            setMessage("");
            setEmails("");
        } else {
            setHidden(true);
            let targVideo = props.videos.filter(
                (video) => video.id === event.target.name
            );
            setVid(targVideo[0]);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const submitOptions = async () => {
        let emailObj = {};
        let regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g

        emails.match(regex).forEach((e, i) => {
            emailObj[i] = e;
        });

        let obj = {
            id: vid.id,
            name: vid.name,
            emails: emails,
            emailsObj: emailObj,
            subject: subject,
            message: message,
            copy: checked,
            userEmail: props.ui.email,
            vidRef: vid,
        };

        props.setOptions(obj);
        navigate("/confirm");
    };

    const handleLogOut = async () => {
        await props.logOut();
        navigate("/login");
    };

    const renderOptions = () => {
        return (
            <Container fluid sx={{ m: 3, display: hidden ? "block" : "none" }}>
                <Button
                    variant="contained"
                    name="Reset"
                    onClick={(event) => handleSubmit(event)}
                >
                    {`<-`} Select Another Video
                </Button>
                <Grid item sx={{ my: 2 }}>
                    <Typography variant="h5">ID: {vid.id || null}</Typography>
                    <Typography variant="h5">
                        Name: {vid.name || null}
                    </Typography>
                </Grid>
                <Card sx={{ my: 2 }}>
                    <CardMedia
                        component="video"
                        src={vid.vidUrl}
                        controls
                        width="960"
                        height="540"
                    />
                </Card>
                <Grid
                    container
                    fluid
                    sx={{
                        my: 3,
                        flexDirection: "column",
                        alignItems: "center",
                        height: "600",
                    }}
                >
                    <Typography variant="h6">Subject</Typography>
                    <TextField
                        fullWidth
                        sx={{ my: 3 }}
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                    ></TextField>
                    <Typography variant="h6">Message Body</Typography>
                    <TextField
                        fullWidth
                        sx={{ my: 3 }}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    ></TextField>
                    <Grid item sx={{ display: "flex" }}>
                        <Typography variant="h6" sx={{mt: 0.9}}>Emails</Typography>
                        <SimplePopper />
                    </Grid>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={emails}
                        onChange={(event) => setEmails(event.target.value)}
                        sx={{ my: 3 }}
                    ></TextField>
                    <Grid item>
                        <Checkbox
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />
                        <Typography variant="h6" component="span">
                            Copy me on email?
                        </Typography>
                    </Grid>
                    <Button variant="contained" onClick={() => submitOptions()}>
                        Confirmation Screen
                    </Button>
                </Grid>
            </Container>
        );
    };

    const renderVideos = () => {
        return props.videos.map((vid) => {
            return (
                <Grid item key={vid.id} sx={{ m: 4 }} hidden={hidden}>
                    <Card sx={{minWidth: 400}}>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={3}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                        >
                            <MDTypography variant="h6" color="white">
                                {vid.name}
                            </MDTypography>
                        </MDBox>
                        <CardMedia
                            component="img"
                            height="200"
                            width="200"
                            src={vid.thumbUrl}
                            sx={{opacity: '0.9'}}
                        />
                        <CardContent
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Button
                                variant="contained"
                                name={`${vid.id}`}
                                onClick={(event) => handleSubmit(event)}
                            >
                                Select
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
    };

    const render = () => {
        if (loading) {
            return <div>Loading...</div>;
        } else if (!loading) {
            return (
                <Grid container>
                    <Grid
                        container
                        item
                        sx={{
                            display: "none",
                            justifyContent: "flex-end",
                            mr: 10,
                        }}
                        
                    >
                        <Typography variant="h4" sx={{ mr: 2 }}>
                            Hi, {props.ui.firstName || null}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => handleLogOut()}
                        >
                            Log Out
                        </Button>
                    </Grid>
                    <Grid container sx={{ display: "flex" }}>
                        {renderVideos()}
                        {renderOptions()}
                    </Grid>
                </Grid>
            );
        }
    };

    useEffect(() => {
        if (props.options.vidRef.id) {
            setHidden(true);
        }
    }, [props.options.vidRef.id]);

    useEffect(() => {
        if (!props.user.id) {
            return;
        }

        if (loading) {
            props
                .appUserInfo(props.user.id)
                .then(() => {
                    props.getVideos(props.user.id);
                })
                .then(() => {
                    setLoading(false);
                });
        }
    }, [props.user.id]);

    useEffect(() => {
        render();
    }, [loading]);

    return (
        <React.Fragment>
            {render()}
        </React.Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        ui: state.ui,
        videos: state.videos,
        options: state.options,
    };
};

export default connect(mapStateToProps, {
    appUserInfo,
    getVideos,
    setOptions,
    logOut,
})(BBApp);

/*
        <DashboardLayout>
            <DashboardNavbar ui={props.ui}/>
            {render()}
        </DashboardLayout>)
*/