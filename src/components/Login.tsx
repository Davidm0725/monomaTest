import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import Spinner from '../generic-components/spinner';
import DashBoard from '../components/dashboard';
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import { environment } from '../enviroments/enviroments';
import { initStore } from '../helpers/constants';

const urlBase = environment.URL_BASE;
const theme = createTheme();



export default function Login() {
    const [userState, setUserState] = useState(initStore);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState({ value: "", error: 'null', msgError: "" });
    const [password, setPassword] = useState({ value: "", error: 'null', msgError: "" });
    let navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        setIsLoading(true);
        const storeSessionStorage = JSON.parse(sessionStorage.getItem('userLogin')!);
        userState.userLogin = storeSessionStorage;
        setTimeout(() => {
            if (userState.userLogin != null) {
                userState.isLogin = true;
            } else {
                userState.isLogin = false;
            }
            setUserState(userState)
            setIsLoading(false);
        }, 100)
    }, []);


    const checkForm = () => {
        if (email.value === "" || password.value === "") {

            if (email.value === "") {
                setEmail({ value: "", error: 'true', msgError: "Email is required" });
            }
            if (password.value === "") {
                setPassword({ value: "", error: 'true', msgError: "Password is required" });
            }
            return false;
        } else {
            return true;
        }
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (checkForm()) {
            setIsLoading(true);
            fetch(urlBase)
                .then(respose => respose.json())
                .then(data => {
                    setTimeout(() => {
                        if (email.value === data.email && password.value === data.password) {
                            sessionStorage.setItem('userLogin', JSON.stringify(data));
                            userState.isLogin = true;
                            userState.userLogin = data;
                            setUserState(userState);
                            navigate("/dashboard");
                        } else {
                            showMessageError({ icon: 'error', title: 'Error', text: 'Invalid email or password.' })
                        }
                        setIsLoading(false);
                    }, 2000);
                });
        } else {
            showMessageError({ icon: 'error', title: 'Error', text: 'Fill in the empty fields.' });
        }
    };

    const showMessageError = (propMsg: any) => {
        const { icon, title, text } = propMsg;
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        })
    }

    const isValidEmail = (email: any) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(email);
    }

    const handleChange = (event: any) => {
        if (!isValidEmail(event.target.value)) {
            setEmail({ value: event.target.value, error: 'true', msgError: "Email is invalid" });
        } else {
            setEmail({ value: event.target.value, error: 'false', msgError: "" });

        }
    };

    return (
        <div>
            {
                isLoading && <Spinner />
            }
            {
                (!userState.isLogin && !isLoading) &&
                <div id='formLogin'>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={handleChange}
                                        error={email.error === 'true' && !isValidEmail(email)}
                                        helperText={email.error === 'true' && email.msgError}
                                    />
                                    <FormControl sx={{ m: 1 }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            required
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            error={password.error === 'true'}

                                            onChange={(e) => setPassword({ value: e.target.value, error: 'false', msgError: "" })}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                        {
                                            password.error === 'true' &&
                                            <FormHelperText error id="accountId-error">
                                                {password.msgError}
                                            </FormHelperText>
                                        }

                                    </FormControl>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}>
                                        Sign In
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            }
        </div>
    );
}