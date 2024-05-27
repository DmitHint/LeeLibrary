package org.leelibrary.backend.user.service;

import org.leelibrary.backend.user.entity.User;

public interface UserService {
    User findUserByEmail(String email);

    User addUser(User user);

    boolean userExistByEmail(String email);
}