package org.leelibrary.backend.book.entity;

import org.leelibrary.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart")
@IdClass(UserProduct.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    @ToString.Exclude
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private Book book;
}