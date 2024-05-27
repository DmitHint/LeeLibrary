package org.leelibrary.backend.book.repository;

import org.leelibrary.backend.book.entity.Book;
import org.leelibrary.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(" select p " +
            "from Favourite w " +
            "join w.book p " +
            "where w.user = :user")
    List<Book> findInFavourite(User user);
}
