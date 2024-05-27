package org.leelibrary.backend.book.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class BookCreationDto {
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String author;

    @NotNull
    @Positive
    private Double rating;

    @NotEmpty
    @Length(min = 1, max = 1000)
    private String description;

    @NotNull
    @Positive
    private Double price;

    @NotNull
    @Positive
    private String genre;
}
