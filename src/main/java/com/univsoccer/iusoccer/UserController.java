package com.univsoccer.iusoccer;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.univsoccer.iusoccer.models.Booking;
import com.univsoccer.iusoccer.models.BookingRepository;
import com.univsoccer.iusoccer.models.BookingService;
import com.univsoccer.iusoccer.models.MyUser;
import com.univsoccer.iusoccer.models.MyUserRepository;

@RestController
public class UserController {

	@Autowired
	private BookingRepository bookingrepository;

	@Autowired
	private MyUserRepository userrepository;

	@Autowired
	private BookingService bookingservice;

	@GetMapping("/admin/users")
	public List<MyUser> retrieveAllUsers() {

		return userrepository.findAll();
//		return userservice.findAll();
	}

	// get user by user id
	@GetMapping("/users/{user_id}")
	public ResponseEntity<?> getBookingsByUserId(@PathVariable("user_id") Long userId) {
		Optional<MyUser> inputUser = userrepository.findById(userId);

		if (inputUser.isPresent()) {
			MyUser output = new MyUser();
			output = (inputUser.get());
			return ResponseEntity.ok(output);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("USER NOT FOUND");
		}

	}

}
