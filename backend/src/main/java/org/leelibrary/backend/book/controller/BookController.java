package org.leelibrary.backend.book.controller;

import org.leelibrary.backend.book.dto.BookCreationDto;
import org.leelibrary.backend.book.dto.BookDto;
import org.leelibrary.backend.book.dto.BookUpdateDto;
import org.leelibrary.backend.book.entity.Book;
import org.leelibrary.backend.book.mapper.BookMapper;
import org.leelibrary.backend.book.service.BookService;
import org.leelibrary.backend.security.principal.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    private final BookMapper bookMapper;

    @PostMapping
    public BookCreationDto addBook(@Valid @RequestBody BookCreationDto dto) {
        log.info("/books POST. RequestBody : {}", dto);
        Book book = bookMapper.toEntity(dto);
        return bookMapper.toDto(bookService.addBook(book));
    }

    @PatchMapping("/{id}")
    public BookCreationDto updateBook(@Valid @RequestBody BookUpdateDto dto, @PathVariable Long id) {
        log.info("/books/{} PATCH. RequestBody : {}", id, dto);
        Book book = bookMapper.toEntity(dto);
        return bookMapper.toDto(bookService.updateBook(book, id));
    }

    @GetMapping("/{id}")
    public BookDto getBook(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/books/{} GET. User id : {}", id, userId);
        return bookService.getBook(id, userId);
    }

    @GetMapping
    public List<BookDto> getBooks(@AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/books GET. User id : {}", userId);
        return bookService.getAllBooks(userId);
    }
}