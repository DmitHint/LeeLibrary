import React, {useState, ChangeEvent, FormEvent, useContext} from 'react';
import {Button, Tab, Tabs, TextField, Box, Paper} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import AuthService from "../../service/AuthService";

interface AuthPageProps {
}

// const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister }) => {
const AuthPage: React.FC<AuthPageProps> = () => {

    const [activeTab, setActiveTab] = useState<number>(0);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const authContext = useContext(AuthContext);
    if (!authContext) {
        return null;
    }
    const {setIsAuth} = authContext;

    const navigate = useNavigate();

    const onSubmitRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await AuthService.register(formData.email, formData.password);
            if (response.status === 200) {
                setIsAuth(true);
                navigate('/catalog');
            } else {
                setIsAuth(false);
                alert("Такой пользователь уже зарегистрирован!");
            }
        } catch (error) {
            console.error(error);
            alert("Ошибка регистрации!");
        }
    }


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const onSubmitLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await AuthService.login(formData.email, formData.password);
            console.log(response);
            console.log(response.status);
            if (response.status === 200) {
                if (response.data.accessToken === null) {
                    setIsAuth(false);
                    alert("Авторизация провалена!");
                } else {
                    setIsAuth(true);
                    navigate(`/catalog`);
                }
            } else {
                alert("Авторизация провалена!");
            }
        } catch (error) {
            alert("Авторизация провалена!");
            console.error(error);
        }
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box display="flex" justifyContent="center" mt={"3%"}>
            <Paper elevation={3} style={{padding: '20px', width: '400px'}}>
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                    <Tab label="Авторизация"/>
                    <Tab label="Регистрация"/>
                </Tabs>

                <div hidden={activeTab !== 0}>
                    <form onSubmit={onSubmitLogin}>
                        <Box mt={2}>
                            <TextField
                                label="Логин"
                                name="login"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                onChange={onChangeHandler}
                                value={formData.email}
                            />
                        </Box>
                        <Box mt={2}>
                            <TextField
                                label="Пароль"
                                name="password"
                                type="password"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                onChange={onChangeHandler}
                                value={formData.password}
                            />
                        </Box>
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Войти
                            </Button>
                        </Box>
                    </form>
                </div>

                <div hidden={activeTab !== 1}>
                    <form onSubmit={onSubmitRegister}>
                        {/*<Box mt={0}>*/}
                        {/*    <TextField*/}
                        {/*        label="Имя"*/}
                        {/*        name="firstName"*/}
                        {/*        fullWidth*/}
                        {/*        margin="normal"*/}
                        {/*        variant="outlined"*/}
                        {/*        onChange={onChangeHandler}*/}
                        {/*        value={formData.firstName}*/}
                        {/*    />*/}
                        {/*</Box>*/}
                        {/*<Box mt={0}>*/}
                        {/*    <TextField*/}
                        {/*        label="Фамилия"*/}
                        {/*        name="lastName"*/}
                        {/*        fullWidth*/}
                        {/*        margin="normal"*/}
                        {/*        variant="outlined"*/}
                        {/*        onChange={onChangeHandler}*/}
                        {/*        value={formData.lastName}*/}
                        {/*    />*/}
                        {/*</Box>*/}
                        <Box mt={0}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                onChange={onChangeHandler}
                                value={formData.email}
                            />
                        </Box>
                        <Box mt={0}>
                            <TextField
                                label="Пароль"
                                name="password"
                                type="password"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                onChange={onChangeHandler}
                                value={formData.password}
                            />
                        </Box>
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Зарегистрироваться
                            </Button>
                        </Box>
                    </form>
                </div>
            </Paper>
        </Box>
    );
};

export default AuthPage;
