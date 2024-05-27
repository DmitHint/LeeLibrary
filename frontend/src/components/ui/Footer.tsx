import React from 'react';
import "../../styles/footer.css";
import "../../styles/style.css";
import RecommendIcon from '@mui/icons-material/Recommend';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailOutlinedIcon from '@mui/icons-material/Email';

const Footer: React.FC = () => {
    return (
        <footer id="contacts">
            <div id="about_block">
                <h2 className="block-header">О сайте</h2>
                <p>
                    "LeeLibrary" – ваш онлайн-портал к миру литературы. Мы предлагаем вам
                    широкий выбор книг, доступных для приобретения и скачивания, чтобы вы
                    могли наслаждаться увлекательными произведениями в любое удобное
                    время. У нас вы найдете богатый выбор произведений – от великих
                    классиков до современных шедевров.<br/><br/>

                    У нас есть уникальная возможность для вас — станьте автором
                    собственной книги! Загружайте свои тексты, делитесь своим воображением
                    с читателями по всему миру и создавайте свой собственный литературный
                    след. <br/><br/>

                    Станьте постоянным читателем и наслаждайтесь литературными открытиями
                    каждый день.
                </p>
            </div>

            <div id="social_networks_block">
                <h2 className="block-header">Социальные сети</h2>

                <div id="soc_network_holder">
                    <a id="vk" href="https://vk.com/" aria-label="ВКонтакте">
                        <RecommendIcon/>
                    </a>
                    <a id="telegram" href="https://telegram.com/" aria-label="Telegram">
                        <TelegramIcon/>
                    </a>
                </div>
            </div>

            <address>
                <h2 className="block-header">Контакты</h2>
                <a href="mailto:leelibrary@yandex.ru">
                    <EmailOutlinedIcon/>
                    leelibrary@yandex.ru
                </a>
                <br/>
                <a href="tel:+79161234567">
                    <LocalPhoneIcon/>
                    +7 (916) 123-45-67
                </a>
            </address>

            <p id="copyright" className="footer-author-text">
                Copyright © 2024 Крыжановский Дмитрий Владимирович, Царев Георгий Дмитриевич
            </p>
        </footer>
    );
};

export default Footer;

