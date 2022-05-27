import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { setOptions } from "../actions";
import MDBox from 'components/MDBox'


const Confirm = (props) => {
    const navigate = useNavigate();
    const [emailObj, setEmailObj] = useState({});
    const [disabled, setDisabled] = useState(true);

    const changeEmails = (event) => {
        setEmailObj({
            ...emailObj,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = () => {
        let obj = {
            id: props.options.id,
            name: props.options.name,
            emails: props.options.emails,
            emailObj: emailObj,
            copy: props.options.copy,
            userEmail: props.ui.email,
            subject: props.options.subject,
            message: props.options.message,
            vidRef: props.options.vidRef,
        };

        props.setOptions(obj);
        navigate("/done");
    };

    const render = () => {
        if (!props.options.id) {
            return;
        }

        return (
            <Grid container sx={{ display: "flex", flexWrap: "nowrap", m: 2 }}>
                <Grid container item fluid sx={{ display: "flex", justifyContent: 'center' }}>
                    <MDBox
                        variant='gradient'
                        bgColor='secondary'
                        borderRadius='lg'

                        sx={{minWidth: 400, minHeight: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', p:2}}
                    >
                        <Typography variant="h6">
                            {props.options.name}
                        </Typography>
                        <Typography variant="h6">{props.options.id}</Typography>
                        <Typography variant="h6">
                            Subject: {props.options.subject}
                        </Typography>
                        <Typography variant="h6">
                            Message: {props.options.message}
                        </Typography>
                        <Typography variant="h6">
                            Copied on emails? {`${props.options.copy}`}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setDisabled(!disabled)}
                        >
                            Edit Emails
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </Button>
                    </MDBox>
                </Grid>
                <Grid container item fluid sx={{ flexDirection: "column" }}>
                    {Object.values(emailObj).map((e, i) => {
                        return (
                            <MDBox
                            variant='gradient'
                            bgColor='info'
                            borderRadius='lg'

                            sx={{width: 400, minHeight: 350, display: 'flex', flexDirection: 'column', p:2}}
                        >
                                <TextField
                                    disabled={disabled}
                                    value={e}
                                    id={i}
                                    onChange={(event) => changeEmails(event)}
                                    name={e}
                                />
                            </MDBox>
                        );
                    })}
                </Grid>
            </Grid>
        );
    };

    useEffect(() => {
        if (!props.options.id) {
            return;
        }
        setEmailObj(props.options.emailsObj);
        render();
    }, [props.options, render]);

    useEffect(() => {
        if (!props.options.id) {
            navigate("/app");
        }
    }, [props.options.id, navigate]);

    return (
        <React.Fragment>
            <Button variant="contained" onClick={() => navigate("/app")}>
                Go Back
            </Button>
            {render()}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        options: state.options,
        ui: state.ui,
    };
};

export default connect(mapStateToProps, { setOptions })(Confirm);
