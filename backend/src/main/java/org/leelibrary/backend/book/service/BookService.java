package org.leelibrary.backend.book.service;

import org.leelibrary.backend.book.dto.BookDto;
import org.leelibrary.backend.book.entity.Cart;
import org.leelibrary.backend.book.entity.Book;

import java.util.List;

public interface BookService {
    Book addBook(Book book);

    Book updateBook(Book book, long bookId);

    BookDto getBook(long bookId, long userId);

    List<BookDto> getAllBooks(long userId);

    BookDto addBookToFavourite(long bookId, long userId);

    BookDto removeBookFromFavourite(long bookId, long userId);

    List<BookDto> getBooksFromFavourite(long userId);

    Cart addBookToCart(long bookId, int amount, long userId);

    void removeBookFromCart(long bookId, long userId);

    List<Cart> getBooksFromCart(long userId);
}