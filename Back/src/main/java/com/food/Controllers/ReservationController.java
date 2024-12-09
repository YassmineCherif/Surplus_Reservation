package com.food.Controllers;

import com.food.Entities.*;
import com.food.Repositories.ReservationRepository;
import com.food.Repositories.SurplusRepository;
import com.food.Services.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.NoSuchElementException;

 @RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor

public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

     @Autowired
     private SurplusRepository surplusRepository;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private SurplusService surplusService;

    @Autowired
    private UserService userService;

     private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);



    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }


     @PostMapping("/{surplusId}/{login}")
     public ResponseEntity<?> createReservation(
             @PathVariable Long surplusId,
             @PathVariable String login) {

         // Retrieve the surplus by its ID
         Surplus surplus = surplusService.getSurplusById(surplusId);
         if (surplus == null) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Surplus not found.");
         }

         // Check if the user has already reserved this surplus
         List<Reservation> existingReservations = reservationRepository.findAllBySurplusId(surplusId);

         if (surplus.isReserved() ) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This surplus is already reserved .");
         }

         for (Reservation reservation : existingReservations) {
             if (reservation.getBeneficiaire().getLogin().equals(login) && reservation.getReponse() == null ) {
                 // If the current user already reserved the surplus, return an error response
                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This surplus is already reserved by you.");
             }
         }

         // Find the user by login
         User beneficiaire = userService.findByLogin(login);
         if (beneficiaire == null) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
         }

         // Create a reservation for the user
         Reservation reservation = reservationService.createReservation(surplus, beneficiaire);
         return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
     }




     @PutMapping("/{id}/reponse")
     public Reservation respondToReservation(
             @PathVariable Long id,  // Path variable to capture reservation ID
             @RequestParam boolean reponse) {

         Optional<Reservation> reservationOptional = reservationRepository.findById(id);

         if (reservationOptional.isPresent()) {
             Reservation reservation = reservationOptional.get();
             reservation.setReponse(reponse);

             // Retrieve the email of the beneficiaire
             String email = reservation.getBeneficiaire().getEmail();

             // Check if the response is "Yes"
             if (reponse) {
                 // If the response is "Yes", set the surplus as reserved
                 Surplus surplus = reservation.getSurplus();
                 if (surplus != null) {
                     surplus.setReserved(true);  // Mark the surplus as reserved
                     surplusRepository.save(surplus);  // Save the updated surplus
                     reservationService.sendReservationStatusEmail(email, " Acceptée " , reservation.getSurplus().getTitre());
                  }
             } else {
                 // If the response is "No", set the surplus as not reserved
                 Surplus surplus = reservation.getSurplus();
                 if (surplus != null) {
                     surplus.setReserved(false);  // Mark the surplus as not reserved
                     surplusRepository.save(surplus);  // Save the updated surplus
                     reservationService.sendReservationStatusEmail(email, " Refusée " , reservation.getSurplus().getTitre());
                 }
             }

             return reservationService.save(reservation); // Assuming save method is part of service
         } else {
             logger.error("Reservation with id {} not found.", id);
             throw new NoSuchElementException("Reservation with id " + id + " not found");
         }
     }

     @GetMapping("/surplus/{surplusId}")
     public ResponseEntity<Reservation> getReservationBySurplusId(@PathVariable Long surplusId) {
         Reservation reservation = reservationService.findBySurplusId(surplusId);
         if (reservation != null) {
             return ResponseEntity.ok(reservation);
         } else {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
         }
     }


     @GetMapping("/surpluss/{surplusId}")
     public List<Reservation> getReservationsBySurplusId(@PathVariable Long surplusId) {
         return reservationService.getReservationsBySurplusId(surplusId);
     }







 }
