package com.univsoccer.iusoccer;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.univsoccer.iusoccer.models.Booking;
import com.univsoccer.iusoccer.models.BookingRepository;
import com.univsoccer.iusoccer.models.BookingService;
import com.univsoccer.iusoccer.models.MyUser;
import com.univsoccer.iusoccer.models.MyUserRepository;

@RestController
public class BookingController {

	@Autowired
	private BookingRepository bookingrepository;

	@Autowired
	private MyUserRepository userrepository;

	@Autowired
	private BookingService bookingservice;

	@PostMapping("/users/{user_id}/booking")
	public ResponseEntity<Object> create_booking(@PathVariable("user_id") Long userId, @RequestBody Booking book) {

		Optional<MyUser> user = userrepository.findById(userId);

//		System.out.print(userId + "  " + user);

		if (!user.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid User ID");
		} else {
//			System.out.print(book);
			book.setUser(user.get());
			LocalDate date = book.getDate();
			LocalTime startTime = book.getStart_time();
			LocalTime endTime = book.getEnd_time();
			String first_name = book.getFirst_name();
			String last_name = book.getLast_name();
			String user_name = book.getUser_name();

			if (date == null || startTime == null || endTime == null || first_name == null || last_name == null
					|| user_name == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields must be filled");
			}
			// Check if a booking with the specified date, and startTime already
			// exists
			boolean userbookingExists = bookingrepository.existsByDateAndStartTime(date, startTime, endTime);
			if (userbookingExists) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("Booking Not Available");
			}

			Booking saveBooking = bookingrepository.save(book);
//			System.out.println(saveBooking);

			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(saveBooking.getBookingId()).toUri();
			return ResponseEntity.created(location).body(saveBooking);

		}
	}

	
	@GetMapping("/admin/booking")
	public List<Booking> getAllBooking() {
		return bookingrepository.findAll();
	}

	@GetMapping("/admin/booking/{bookingId}")
	public ResponseEntity<?> retrieveBooking(@PathVariable int bookingId) {
		Optional<Booking> booking = bookingrepository.findById(bookingId);
		if (booking.isPresent()) {
			List<Booking> output = new ArrayList<>();
			output.add(booking.get());
			return ResponseEntity.ok(output);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("USER NOT FOUND");
		}
	}

	// get booking by user id
	@GetMapping("/users/{user_id}/bookings")
	public List<Booking> getBookingsByUserId(@PathVariable("user_id") Long userId) {
		List<Booking> userbooking = new ArrayList<Booking>();
		List<Booking> allbooking = bookingrepository.findAll();

		for (Booking booking : allbooking) {
			if (booking.getUser().getId().equals(userId)) {
				userbooking.add(booking);
			}
		}
		return userbooking;
	}

//	delete booking
	@DeleteMapping("/admin/booking/{bookingId}")
	public ResponseEntity<Object> deleteBooking(@PathVariable("bookingId") int bookingId) {
		Optional<Booking> booking = bookingrepository.findById(bookingId);

		if (booking.isPresent()) {
			bookingrepository.delete(booking.get());
			return ResponseEntity.accepted().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
