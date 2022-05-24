import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { TextField, Card, CardContent, Typography, Container, Button } from "@mui/material"
import { connect } from 'react-redux'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetAuth = (props) => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();

    const auth = async () => {
        let code = searchParams.get('code')
        
        const response = await axios.post('http://localhost:3001/api/sign-up', {
            email: username,
            password: password,
            code: code
        })

        console.log(response)
        navigate('/login')
    }

    const getCode = async () => {
        const response = await axios.get('http://localhost:3001/api/signup-link')

        window.location.assign(response.data)
    }

    useEffect(() => {
        let code = searchParams.get('code')
        console.log(code)
        if (!code) {
            return getCode()
        }

    }, []);

    return (
    <Container fluid sx={{ display: 'flex', justifyContent: 'center'}}>
        <Card variant='outlined' sx={{ width: 400, minHeight: 400, display: 'flex', justifyContent: 'center' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', m: 2 }}>
                <Typography variant='h3'>Sign Up</Typography>
                <TextField label='Username/Email' value={username} onChange={(event) => setUserName(event.target.value)}/>
                <TextField label='Password' type='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                <Button variant='contained' onClick={() => auth()}>Submit</Button>
            </CardContent>
        </Card>
    </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        email: state.email
    }
}

export default connect(mapStateToProps)(GetAuth);
