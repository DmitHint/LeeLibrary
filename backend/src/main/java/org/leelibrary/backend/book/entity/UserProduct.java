package org.leelibrary.backend.book.entity;

import org.leelibrary.backend.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserProduct implements Serializable {
    private User user;
    private Book book;
}