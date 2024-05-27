package org.leelibrary.backend.book.mapper;

import org.leelibrary.backend.order.dto.OrderBookDto;
import org.leelibrary.backend.book.dto.BookCreationDto;
import org.leelibrary.backend.book.dto.BookDto;
import org.leelibrary.backend.book.dto.BookUpdateDto;
import org.leelibrary.backend.book.entity.Cart;
import org.leelibrary.backend.book.entity.Book;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookMapper {
    public Book toEntity(BookCreationDto dto) {
        return Book.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .price(dto.getPrice())
                .rating(dto.getRating())
                .description(dto.getDescription())
                .genre(dto.getGenre())
                .build();
    }

    public Book toEntity(BookUpdateDto dto) {
        return Book.builder()
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .price(dto.getPrice())
                .rating(dto.getRating())
                .description(dto.getDescription())
                .genre(dto.getGenre())
                .build();
    }

    public BookDto toDto(Book book, boolean inFavourite, boolean inCart) {
        return BookDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .rating(book.getRating())
                .description(book.getDescription())
                .genre(book.getGenre())
                .inFavourite(inFavourite)
                .inCart(inCart)
                .price(book.getPrice())
                .build();
    }

    public OrderBookDto toDto(Cart cart) {
        return OrderBookDto.builder()
                .id(cart.getBook().getId())
                .title(cart.getBook().getTitle())
                .author(cart.getBook().getAuthor())
                .price(cart.getBook().getPrice())
                .rating(cart.getBook().getRating())
                .build();
    }

    public BookCreationDto toDto(Book book) {
        return BookCreationDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .rating(book.getRating())
                .description(book.getDescription())
                .genre(book.getGenre())
                .price(book.getPrice())
                .build();
    }

    public List<OrderBookDto> toDtoList(List<Cart> cartEntityList) {
        return cartEntityList.stream()
                .map(this::toDto)
                .toList();
    }
}
