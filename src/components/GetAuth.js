import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    TextField,
    CardContent,
    Typography,
    Container,
    Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MDBox from 'components/MDBox'

const api = axios.create({
    baseURL: "/be",
    // baseURL: 'http://localhost:3001',
    withCredentials: true
});

const GetAuth = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [searchParams] = useSearchParams();

    const auth = async () => {
        let code = searchParams.get("code");

        const response = await api.post("/api/sign-up", {
            email: username,
            password: password,
            code: code,
        });

        console.log(response);
        navigate("/login");
    };

    const getCode = async () => {
        const response = await api.get("/api/signup-link");

        window.location.assign(response.data);
    };

    useEffect(() => {
        let code = searchParams.get("code");

        if (!code) {
            return getCode();
        }
    }, [searchParams]);

    return (
        <Container fluid sx={{ display: "flex", justifyContent: "center" }}>
            <MDBox
                variant="gradient"
                bgColor="secondary"
                borderRadius="lg"
                coloredShadow="error"
                sx={{ minWidth: 400, minHeight: 350, display: 'flex', justifyContent: 'center', mt: 20}}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        m: 2,
                    }}
                >
                    <Typography variant="h3">Sign In</Typography>
                    <Typography variant='body2' color='error' sx={{fontWeight: 'bold'}}>Does not have to be the same as BombBomb</Typography>
                    <TextField
                        label="Username/Email"
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button variant="contained" onClick={() => auth()}>
                        Submit
                    </Button>
                </CardContent>
            </MDBox>
        </Container>
    );
};


export default GetAuth;
