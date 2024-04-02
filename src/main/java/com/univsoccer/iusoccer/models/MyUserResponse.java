package com.univsoccer.iusoccer.models;

import org.springframework.security.core.userdetails.UserDetails;

public class MyUserResponse {
    private final UserDetails userDetails;
    private final Long userId;

    public MyUserResponse(UserDetails userDetails, Long userId) {
        this.userDetails = userDetails;
        this.userId = userId;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public Long getUserId() {
        return userId;
    }
}