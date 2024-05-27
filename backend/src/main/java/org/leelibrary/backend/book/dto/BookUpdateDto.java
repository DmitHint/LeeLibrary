package org.leelibrary.backend.book.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookUpdateDto {
    private String title;
    private String author;
    private Double price;
    private Double rating;
    private String description;
    private String genre;
}
