package org.leelibrary.backend.book.repository;

import org.leelibrary.backend.book.entity.Cart;
import org.leelibrary.backend.book.entity.Book;
import org.leelibrary.backend.book.entity.UserProduct;
import org.leelibrary.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, UserProduct> {
    List<Cart> findByUser(User user);

    boolean existsByUserProduct(Book book, User user);
}