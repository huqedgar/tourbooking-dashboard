import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCallback, useContext, useEffect, useState } from 'react';
import { MyUserContext } from '../contexts/MyContext';
import { useLocation, useNavigate } from 'react-router-dom';
import API, { authAPI, endpoints } from '../configs/API';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [user, dispatch] = useContext(MyUserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleUsernameChange = useCallback((e) => {
        setUsername(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const handleRememberChange = useCallback(() => {
        setRemember(!remember);
    }, [remember]);

    const handleSubmit = useCallback(
        async (evt) => {
            evt.preventDefault();
            if (username.trim() === '' || password.trim() === '') {
                return toast.warning('Must enter username and password!');
            }
            try {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('password', password);
                formData.append('client_id', process.env.REACT_APP_CLIENT_ID);
                formData.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
                formData.append('grant_type', 'password');
                const res = await API.post(endpoints['login'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data;',
                    },
                });
                let date = new Date();
                date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
                if (remember) {
                    Cookies.set('access-token', res.data.access_token, { expires: date });
                } else {
                    Cookies.set('access-token', res.data.access_token);
                }
                const user = await authAPI().get(endpoints['current-user']);
                if (user.status === 200) {
                    if (!user.data.is_staff) {
                        Cookies.remove('access-token');
                        return toast.error('Please use employee account!');
                    }
                }
                if (remember) {
                    Cookies.set('current-user', JSON.stringify(user.data), { expires: date });
                } else {
                    Cookies.set('current-user', JSON.stringify(user.data));
                }
                dispatch({
                    type: 'login',
                    payload: JSON.stringify(user.data),
                });
            } catch (ex) {
                toast.error(ex.message);
            }
        },
        [dispatch, username, password, remember],
    );

    useEffect(() => {
        if (user !== null) {
            if (location.state && location.state.from) {
                navigate(location.state.from);
            } else {
                navigate('/');
            }
        }
    }, [user, navigate, location]);

    return (
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            type="text"
                            name="username"
                            label="Username"
                            onChange={handleUsernameChange}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            type="password"
                            name="password"
                            label="Password"
                            onChange={handlePasswordChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" onChange={handleRememberChange} />}
                            label="Remember me"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
            <ToastContainer />
        </ThemeProvider>
    );
}
