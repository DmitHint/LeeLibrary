import React, {useState, ChangeEvent, FormEvent, useContext} from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

import "../../styles/profile_info.css";
import "../../styles/style.css";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import AuthService from "../../service/AuthService";

const Profile: React.FC = () => {

    const router = useNavigate()

    const authContext = useContext(AuthContext);
    if (!authContext) {
        return null;
    }
    const {setIsAuth} = authContext;

    const logout = () => {
        AuthService.logout();
        setIsAuth(false);
        router("/auth/login");
    }

    return (
        <div className="profile_container">
            <div className="sidebar">
                <div className="sections">
                    <div className="sections-item">Профиль</div>
                    <div className="sections-item">Личные данные</div>
                    <div className="sections-item">Заказы</div>
                    <div className="sections-item">Подписка</div>
                    <div className="logout-item">
                        <LogoutIcon/>
                        Выйти
                    </div>
                </div>
            </div>
            <div className="profile-content">
                <h2>ПРОФИЛЬ</h2>
                <h3>ЛИЧНЫЕ ДАННЫЕ</h3>
                <p>Крыжановский Дмитрий</p>
                <p>+7 (912) 123-45-67 · dmitr.kryzh@gmail.com</p>
                <h3>АКТИВНЫЕ ЗАКАЗЫ</h3>
                <p>У вас пока нет активных заказов</p>
                <h3>АБОНЕМЕНТ</h3>
                <p>3 книги в месяц</p>
                <h3>КНИГ ПРОЧИТАНО: 2</h3>
                <h3>ОТЗЫВОВ ОСТАВЛЕНО: 3</h3>
            </div>
        </div>
    )
        ;
};

export default Profile;
