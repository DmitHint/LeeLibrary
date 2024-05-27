import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface AuthResponse {
    accessToken?: string;
}

interface UserData {
    email: string;
    password: string;
}

const register = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    const data: UserData = {email, password};
    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/auth/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        data,
    };

    let response = await axios.request<AuthResponse>(config);
    if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
};

const login = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    const data: UserData = {email, password};
    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data,
    };

    localStorage.removeItem('user');
    let response = await axios.request<AuthResponse>(config);
    if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
};

const logout = (): void => {
    localStorage.removeItem('user');
};

const getToken = (): string | null => {
    const userJson = localStorage.getItem('user');

    if (userJson) {
        const userObject: AuthResponse = JSON.parse(userJson);
        return userObject.accessToken || null;
    }
    return null;
};

const AuthService = {
    register,
    login,
    logout,
    getToken,
};

export default AuthService;