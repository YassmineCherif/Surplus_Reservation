package com.food.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.food.Repositories.*;
import com.food.Entities.*;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurplusService {

    private final SurplusRepository surplusRepository;
    private final UserRepository userRepository;

    private final ReservationRepository reservationRepository;


    // Ajouter un surplus
    public Surplus addSurplus(Surplus surplus) {
        return surplusRepository.save(surplus);
    }


    // Get all surpluses
    public List<Surplus> getAllSurpluses() {
        return surplusRepository.findAll();
    }

    // Get surplus by ID
    public Surplus getSurplusById(Long id) {
        return surplusRepository.findById(id).orElse(null);
    }
    public List<Surplus> getSurplusesByUserId(Long userId) {
        // Assuming the surplus has a 'donateur' field that references the user, and the User entity has an 'id' field
        return surplusRepository.findByDonateur_Iduser(userId); // This will call the appropriate repository method
    }
    // Update a surplus
    public Surplus updateSurplus(Long id, Surplus surplus) {
        if (surplusRepository.existsById(id)) {
            surplus.setId(id); // Ensure the ID is preserved
            return surplusRepository.save(surplus);
        }
        return null; // Surplus not found
    }

    // Delete a surplus
    public boolean deleteSurplus(Long id) {
        if (surplusRepository.existsById(id)) {
            surplusRepository.deleteById(id);
            return true;
        }
        return false; // Surplus not found
    }




}
