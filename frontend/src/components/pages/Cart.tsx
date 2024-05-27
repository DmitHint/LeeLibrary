import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import StarIcon from '@mui/icons-material/Star';
import '../styles/style.css';
import '../styles/cart.css';

const Cart: React.FC = () => {
    const [cart, setCart] = useState<any[]>([]);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
    }, []);

    const totalPrice = (cartItems: any[]) => {
        return cartItems.reduce((sum, item) => sum + Number(item.price), 0);
    };

    const addElementsHTML = (arr: any[]) => {
        return arr.map(item => (
            <div className="cart-item" key={item.id}>
                <img className="cover" src={item.cover} alt={item.title} />
                <div className="cart-item-info">
                    <p className="cart-item-title">{item.title}</p>
                    <div className="rating-field">
                        <StarIcon className="star-ico"/>
                        <p className="rating">{item.rating.value}</p>
                        <p className="votes">({item.rating.votes})</p>
                    </div>
                    <p className="cart-item-author">{item.author}</p>
                    <p className="cart-item-price">{item.price} ₽</p>
                </div>
                <div className="remove-item" onClick={() => removeItem(item.id)}>✕</div>
            </div>
        ));
    };

    const removeItem = (id: number) => {
        const updatedCart = cart.filter(book => book.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart.map(item => ({ id: item.id }))));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const sortByRating = () => {
        const sortedCart = [...cart].sort((a, b) => b.rating.value - a.rating.value);
        setCart(sortedCart);
        setIsSorted(!isSorted);
    };

    const setSortColor = () => {
        return isSorted ? { color: "#af3030" } : { color: "#000" };
    };

    return (
        <div>
            <div className="panel">
                <div className="left-side"><h1>Корзина</h1></div>
                <div className="right-side">
                    <span className="icon sort" onClick={sortByRating} style={setSortColor()}>
                        <IonIcon name="swap-vertical-outline" />
                        <p>по рейтингу</p>
                    </span>
                    <span className="icon trash" onClick={clearCart}>
                        <IonIcon name="trash-outline" />
                    </span>
                </div>
            </div>
            <div id="cart-container">
                {cart.length === 0 ? (
                    <h3>Корзина пуста. Добавьте книги из каталога</h3>
                ) : (
                    addElementsHTML(cart)
                )}
            </div>
            {cart.length > 0 && (
                <div id="payment-button">
                    К оплате: <span id="summ-placeholder">{totalPrice(cart)} ₽</span>
                </div>
            )}
        </div>
    );
};

export default Cart;