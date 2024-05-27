package org.leelibrary.backend.book.entity;

import org.leelibrary.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "favourite")
@IdClass(UserProduct.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Favourite{
    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private Book book;
}