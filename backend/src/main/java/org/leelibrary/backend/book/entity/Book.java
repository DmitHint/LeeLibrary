package org.leelibrary.backend.book.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "book")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Double rating;

    @ToString.Exclude
    @Column(nullable = false, length = 3000)
    private String description;

    @Column(nullable = false)
    private String genre;
}