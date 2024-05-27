package org.leelibrary.backend.user.service;


import org.leelibrary.backend.user.entity.User;
import org.leelibrary.backend.user.entity.UserRole;
import org.leelibrary.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DefaultUserService implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    @Override
    public User findUserByEmail(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        log.info("User found by email successful. User : {} ", user);
        return user;
    }

    @Transactional
    @Override
    public User addUser(User user) {
        user.setRole(UserRole.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        log.info("User saved successful. User {}", savedUser);
        return savedUser;
    }

    @Transactional(readOnly = true)
    @Override
    public boolean userExistByEmail(String email) {
        boolean exists = userRepository.existsByEmailIgnoreCase(email);
        log.info("User existence by email {} has been checked. existence : {} ", email, exists);
        return exists;
    }
}