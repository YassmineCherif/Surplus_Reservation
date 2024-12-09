package com.food.Controllers;

import com.food.Entities.*;
import com.food.Services.SurplusService;
import com.food.Repositories.*;
import com.food.Services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/surplus")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class SurplusController {

    private final SurplusService surplusService;
    private final UserRepository userRepository;
    private final SurplusRepository surplusRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ReservationService reservationService;



    // API pour ajouter un surplus
    @PostMapping
    public ResponseEntity<Surplus> addSurplus(@RequestBody Surplus surplus) {
        // Check if the donateur exists by login
        User donateur = userRepository.findByLogin(surplus.getDonateur().getLogin());

        if (donateur == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        surplus.setDonateur(donateur);  // Set the full User object

        Surplus createdSurplus = surplusService.addSurplus(surplus);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSurplus);
    }


    @GetMapping("/specificID")
    public ResponseEntity<List<Surplus>> getAllSurplusess(@RequestParam(required = false) Long userId) {
        List<Surplus> surpluses;
        if (userId != null) {
            surpluses = surplusService.getSurplusesByUserId(userId);
        } else {
            surpluses = surplusService.getAllSurpluses();
        }
        return ResponseEntity.ok(surpluses);
    }

    // API for getting all surpluses
    @GetMapping
    public ResponseEntity<List<Surplus>> getAllSurpluses() {
        List<Surplus> surpluses = surplusService.getAllSurpluses();
        return ResponseEntity.ok(surpluses);
    }

    // API for getting a surplus by ID
    @GetMapping("/{id}")
    public ResponseEntity<Surplus> getSurplusById(@PathVariable Long id) {
        Surplus surplus = surplusService.getSurplusById(id);
        return surplus != null ? ResponseEntity.ok(surplus) : ResponseEntity.notFound().build();
    }

    // API for updating a surplus
    @PutMapping("/{id}")
    public ResponseEntity<Surplus> updateSurplus(@PathVariable Long id, @RequestBody Surplus surplus) {
        Surplus updatedSurplus = surplusService.updateSurplus(id, surplus);
        return updatedSurplus != null ? ResponseEntity.ok(updatedSurplus) : ResponseEntity.notFound().build();
    }

    // API for deleting a surplus
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSurplus(@PathVariable Long id) {
        boolean isDeleted = surplusService.deleteSurplus(id);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


    @GetMapping("/surplus/{surplusId}")
    public Surplus getSurplusTitle(@PathVariable Long surplusId) {
        return surplusRepository.findById(surplusId).orElseThrow(() -> new NoSuchElementException("Surplus not found"));
    }

    @GetMapping("/user")
    public ResponseEntity<List<String>> getAllUsers() {
        List<String> users = userService.getAllUserLogins();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }



}
