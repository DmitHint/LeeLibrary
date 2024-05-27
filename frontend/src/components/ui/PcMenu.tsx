import React from 'react';
import {Link} from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';


const PcMenu: React.FC = () => {
    return (
        <div className="pc-menu">
            <ul>
                <li className="nav-item">
                    <Link to="/home" className="active">
                        <HomeOutlinedIcon/>
                        Главная
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/catalog">
                        <AutoStoriesOutlinedIcon/>
                        Каталог
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/favorite">
                        <FavoriteBorderOutlinedIcon/>
                        Отложенное
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/cart">
                        <ShoppingBagOutlinedIcon/>
                        Корзина
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/profile_info">
                        <PermIdentityOutlinedIcon/>
                        Профиль
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default PcMenu;