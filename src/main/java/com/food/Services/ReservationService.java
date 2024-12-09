package com.food.Services;


import com.food.Entities.*;
import com.food.Repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

@Service
@RequiredArgsConstructor
public class ReservationService {
    @Autowired
    private UserRepository userRepository;

    private final ReservationRepository reservationRepository;
    private final SurplusService surplusService;


    @Autowired
    private JavaMailSender mailSender;


    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation createReservation(Surplus surplus, User beneficiaire) {
        // Proceed with creating the reservation even if the surplus is already reserved,


        // Create a reservation for the user
        Reservation reservation = new Reservation();
        reservation.setSurplus(surplus);
        reservation.setBeneficiaire(beneficiaire);
        reservation.setDateReservation(new Date()); // Set current date/time

        // Update the surplus using its ID
        surplusService.updateSurplus(surplus.getId(), surplus);  // Pass surplus ID and updated surplus

        return reservationRepository.save(reservation);
    }


    public Reservation findBySurplusId(Long surplusId) {
        // Search the reservation by surplus_id
        Optional<Reservation> reservationOpt = reservationRepository.findBySurplusId(surplusId);
        if (reservationOpt.isEmpty()) {
            throw new NoSuchElementException("No reservation found with id " + surplusId);
        }
        return reservationOpt.get();
    }

    public Reservation save(Reservation reservation) {
        return reservationRepository.save(reservation);
    }


    public List<Reservation> getReservationsBySurplusId(Long surplusId) {
        return reservationRepository.findReservationsBySurplusId(surplusId);
    }


    public void sendReservationStatusEmail(String email, String reponse , String titre) {
        // Send the new password to the user's email

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("indila205@gmail.com");
        message.setTo(email);
        message.setSubject("Réponse à votre réservation");
        message.setText("Votre réservation " + titre + " est : " + reponse);
        mailSender.send(message);
    }


}