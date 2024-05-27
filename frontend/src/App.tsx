import React, {useEffect, useState} from 'react';
import './styles/App.css';
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import {AuthContext} from "./context/AuthContext";
import AuthService from "./service/AuthService";
import {AppRouter} from "./components/ui/AppRouter";

// axios.defaults.baseURL = 'http://188.225.79.252:8080/';

const App: React.FC = () => {
    // const [isAuth, setIsAuth] = useState<boolean>(AuthService.getToken() !== null);
    const [isAuth, setIsAuth] = useState<boolean>(true);

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <div className="App">
                <Header/>
                <AppRouter/>
                <Footer/>
            </div>
        </AuthContext.Provider>
    );
};

export default App;