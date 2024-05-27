import React from 'react';
import {Link} from "react-router-dom";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const MobileMenu: React.FC = () => {
    return (
        <div className="mobile-menu">
            <ul>
                <li className="list active">
                    <Link to="/index" className="active">
                            <span className="icon">
                                <HomeOutlinedIcon/>
                            </span>
                        <span className="text">Главная</span>
                    </Link>
                </li>

                <li className="list">
                    <Link to="/catalog">
                            <span className="icon">
                                <AutoStoriesOutlinedIcon/>
                            </span>
                        <span className="text">Каталог</span>
                    </Link>
                </li>

                <li className="list">
                    <Link to="/favorite">
                            <span className="icon">
                                <FavoriteBorderOutlinedIcon/>
                            </span>
                        <span className="text">Отложенное</span>
                    </Link>
                </li>

                <li className="list">
                    <Link to="/cart">
                            <span className="icon">
                                <ShoppingBagOutlinedIcon/>
                            </span>
                        <span className="text">Корзина</span>
                    </Link>
                </li>

                <li className="list">
                    <Link to="/profile_info">
                            <span className="icon">
                                <PermIdentityOutlinedIcon/>
                            </span>
                        <span className="text">Профиль</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MobileMenu;