package com.univsoccer.iusoccer.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private MyUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> user = repository.findByUsername(username);
        
        if (user.isPresent()) {
            var userObj = user.get();
            System.out.println();
//            System.out.println(userObj.getId());
            System.out.println();
            System.out.println();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(getRoles(userObj))
                    .build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }

    private String[] getRoles(MyUser user) {
        if (user.getRole() == null) {
            return new String[]{"ROLE_USER"};
        }
        return user.getRole().split(",");
    }
    
    public Long getUserId(String username) throws UsernameNotFoundException {
        Optional<MyUser> user = repository.findByUsername(username);

        if (user.isPresent()) {
            return user.get().getId();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }
}