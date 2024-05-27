package org.leelibrary.backend.order.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderBookDto {
    private long id;
    private String title;
    private String author;
    private double price;
    private double rating;
    private int amount;
}