import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PcMenu from "./PcMenu";
import MobileMenu from "./MobileMenu";
import '../../styles/header.css';
import '../../styles/style.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const Header: React.FC = () => {

    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header>
            <Link to="/home" className="icon">
                <img src={require(`../../assets/logo.png`)} alt="Логотип" width="48px" height="48px"/>
                <h1>LeeLibrary</h1>
            </Link>

            <div className="search-box">
                <form action="">
                    <input type="text" name="search" id="search" placeholder="Поиск"/>
                    <button type="submit" title="search">
                        <SearchOutlinedIcon sx={{ color: "white"}}/>
                    </button>
                </form>
            </div>

            {isMobile ? <MobileMenu/> : <PcMenu/>}

        </header>
    );
};

export default Header;