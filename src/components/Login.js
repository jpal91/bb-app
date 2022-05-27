import {
    TextField,
    Card,
    CardContent,
    Typography,
    Container,
    Button,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import MDBox from "components/MDBox";

import { setUser, setEmail } from "../actions";

const api = axios.create({
    baseURL: "/be",
    // baseURL: "http://localhost:3001",
    withCredentials: true,
});

const Login = (props) => {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const response = await api.post("/api/login", {
            username: username,
            password: password,
        });

        if (response.data._id) {
            props.setUser(response.data);
        }

        navigate("/app");
        return;
    };

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
                    <Typography variant="h3">Login</Typography>
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
                    <Button variant="contained" onClick={() => login()}>
                        Submit
                    </Button>
                </CardContent>
            </MDBox>
        </Container>
    );
};

export default connect(null, { setUser, setEmail })(Login);
