package com.food.Controllers;
import com.food.Entities.EmailRequest;
import com.food.Entities.User;
import com.food.Repositories.UserRepository;
import com.food.Services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

     @Autowired
     private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String loginEmail, @RequestParam String password) {
        User user;
        Map<String, String> response = new HashMap<>();

        try {
                user = userService.findByLogin(loginEmail);

        } catch (EntityNotFoundException e) {
            response.put("message", "Invalid login or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (password.equals(user.getMdp())) {
            response.put("message", "Login successful");
            response.put("role", user.getRole().toString());

            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid login or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }



    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        try {
            userService.saveUser(user); // Save user in the database
            response.put("message", "Registration successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Registration failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }



    @PostMapping("/send-email")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        userService.sendSimpleEmail(emailRequest.getToEmail(), emailRequest.getSubject(), emailRequest.getBody());
    }

    @PostMapping("/forgot-password/{email}")
    public ResponseEntity<String> forgotPassword(@PathVariable String email) {
        try {
            userService.resetPassword(email);
            return ResponseEntity.ok("Password reset email sent successfully");
        } catch (IllegalArgumentException e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }



    @GetMapping("/profile/{login}")
    public ResponseEntity<User> getUserProfile(@PathVariable String login) {
        // Your logic to get the user profile
        User user = userRepository.findByLogin(login);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/profile/{login}")
    public ResponseEntity<Map<String, String>> updateUserProfile(@PathVariable String login, @RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            userService.updateUserProfile(login, user);
            response.put("message", "Profile updated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Profile update failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User user = userRepository.findById(id).orElseThrow();
            user.setRole(userDetails.getRole());
            return userRepository.save(user);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found", e);
        }
    }


}
