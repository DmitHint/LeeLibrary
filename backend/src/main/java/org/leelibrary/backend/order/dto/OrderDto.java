package org.leelibrary.backend.order.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderDto {
    private Long id;
    private LocalDateTime date;
    private String recipientsFullName;
    private String recipientsPhoneNumber;
    private String recipientsEmail;
    private String address;
    private String intercom;
    private String comments;
    private List<OrderBookDto> products;
}