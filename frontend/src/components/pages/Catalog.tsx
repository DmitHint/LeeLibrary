import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AuthService from '../../service/AuthService';
import { useNavigate } from 'react-router-dom';
import {useFetching} from "../../hooks/useFetching";

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import StarIcon from '@mui/icons-material/Star';

interface Book {
    id: number;
    title: string;
    author: string;
    cover: string;
    genre: string;
    rating: {
        value: number;
        votes: number;
    };
}

const Catalog: React.FC<> = () => {
    const [catalogBooks, setCatalogBooks] = useState<Book[]>([]);
    const [cart, setCart] = useState<Book[]>([]);
    const [liked, setLiked] = useState<Book[]>([]);

    const authContext = useContext(AuthContext);
    if (!authContext) {
        return null;
    }
    const {setIsAuth} = authContext;
    const navigate = useNavigate();

    // const [fetchProducts, isLoading, error] = useFetching(async () => {
    //     const catalogBooks = await BookService.getCatalogBooks();
    //     setCatalogBooks(catalogBooks);
    // });

    useEffect(() => {
        // fetch('../data/catalog.json')
        //     .then(response => response.json()
        //     .then(data => {
        //         setCatalogBooks(data.filter((book: Book) => book.genre === genre));
        //     })
        //     .catch(error => console.error('Error loading books:', error));
    }, []);

    const addToCart = (bookId: number) => {
        // const updatedCart = [...cart];
        // if (!updatedCart.find(item => item.id === bookId)) {
        //     const newBook = { id: bookId };
        //     updatedCart.push(newBook as Book);
        //     setCart(updatedCart);
        //     localStorage.setItem('cart', JSON.stringify(updatedCart));
        // }
    };

    const likeClicked = (bookId: number) => {
        // const updatedLiked = [...liked];
        // const isLiked = updatedLiked.find(item => item.id === bookId);
        // if (isLiked) {
        //     setLiked(updatedLiked.filter(item => item.id !== bookId));
        // } else {
        //     const newBook = { id: bookId };
        //     updatedLiked.push(newBook as Book);
        //     setLiked(updatedLiked);
        // }
        // localStorage.setItem('liked', JSON.stringify(updatedLiked));
    };

    const createCard = (book: Book) => {
        const isInCart = cart.some(item => item.id === book.id);
        const isInLiked = liked.some(item => item.id === book.id);

        return (
            <div key={book.id} className="book-card" data-book-id={book.id}>
                <a href={`../pages/book_details.html?id=${book.id}`}>
                    <img className="book-cover" src={book.cover} alt="Обложка книги" />
                    <div className="caption">
                        <p className="book-title">{book.title}</p>
                        <p>{book.author}</p>
                    </div>
                </a>
                <div className="card-bottom">
                    <div className="rating-field">
                        <StarIcon/>
                        <span id="rating">{book.rating.value}</span>
                        <span id="votes">({book.rating.votes})</span>
                    </div>
                    <button
                        className={`button cart-button ${isInCart ? 'in-list' : 'out-list'}`}
                        onClick={() => addToCart(book.id)}
                    >
                        <ShoppingBagOutlinedIcon/>
                    </button>
                    <button
                        className={`button like-button ${isInLiked ? 'in-list' : 'out-list'}`}
                        onClick={() => likeClicked(book.id)}
                    >
                        {isInLiked ? <FavoriteIcon/>: <FavoriteBorderIcon/>}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="books">
            {catalogBooks.map(book => createCard(book))}
        </div>
    );
};

export default Catalog;
