package com.univsoccer.iusoccer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.univsoccer.iusoccer.models.Booking;
import com.univsoccer.iusoccer.models.BookingRepository;
import com.univsoccer.iusoccer.models.MyUser;
import com.univsoccer.iusoccer.models.MyUserDetailService;
import com.univsoccer.iusoccer.models.MyUserRepository;
import com.univsoccer.iusoccer.models.MyUserResponse;

@RestController
public class Controller {
	@Autowired
	private MyUserDetailService userDetailsService;
	
	@Autowired
	private MyUserRepository userrepository;

	@GetMapping("/home")
	public String home() {
		return "home";
	}

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/login")
	public ResponseEntity<?> handleLogin(@RequestBody MyUser user) {
		String username = user.getUsername();
		String password = user.getPassword();

		UserDetails currentUserInput = userDetailsService.loadUserByUsername(username);
		
		
		
		
		

//		if (currentUserInput != null) { // Check if user is present before printing
//			System.out.print(currentUserInput);
//		}
//		else {
//			System.out.print("No user");
//		}

		if (passwordEncoder.matches(password, currentUserInput.getPassword())) {
            Long userId = userDetailsService.getUserId(username); // Get user ID using separate method
//            System.out.println("this is " + userId);

            MyUserResponse response = new MyUserResponse(currentUserInput, userId);
            return ResponseEntity.ok(response);

		}

		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
	}

}


