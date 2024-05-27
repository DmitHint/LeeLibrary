package org.leelibrary.backend.book.repository;

import org.leelibrary.backend.book.entity.Book;
import org.leelibrary.backend.book.entity.UserProduct;
import org.leelibrary.backend.book.entity.Favourite;
import org.leelibrary.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavouriteRepository extends JpaRepository<Favourite, UserProduct> {
    boolean existsByProductAndUser(Book book, User user);

    List<Favourite> findByUser(User user);
}