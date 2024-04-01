package com.univsoccer.iusoccer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.univsoccer.iusoccer.models.MyUserDetailService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity.csrf(AbstractHttpConfigurer::disable).httpBasic(Customizer.withDefaults())
				.authorizeHttpRequests(registry -> {
					registry.requestMatchers("/home", "/login", "/register/**").permitAll();
					registry.requestMatchers("/admin/**").hasRole("ADMIN");
					registry.requestMatchers("/user/**").hasRole("USER");
					registry.requestMatchers("/booking/**").hasRole("USER");
					registry.requestMatchers("/booking/**").hasRole("ADMIN");
					registry.anyRequest().authenticated();
				}).build();
	}

//	.formLogin(AbstractAuthenticationFilterConfigurer::permitAll)

//  @Bean
//  public UserDetailsService userDetailsService() {
//      UserDetails normalUser = User.builder()
//              .username("gc")
//              .password("$2a$12$pLlEDlW7J3LJMLMl0Uv8Xu.NO1TYDvrMmIpoDhpHZ3So65XlsR.Vy")
//              .roles("USER")
//              .build();
//      UserDetails adminUser = User.builder()
//              .username("admin")
//              .password("$2a$12$4MVGfzHJ2C370at3MTGHdeX6z/kon2X5KbVWZTGfqjWBhj.KnQBuC")
//              .roles("ADMIN", "USER")
//              .build();
//      return new InMemoryUserDetailsManager(normalUser, adminUser);
//  }
	@Autowired
	private MyUserDetailService userDetailsService;

	@Bean
	public UserDetailsService userDetailsService() {
		return userDetailsService;
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService());
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
