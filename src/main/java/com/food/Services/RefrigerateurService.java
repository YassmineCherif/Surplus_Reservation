package com.food.Services;

import com.food.Entities.Refrigerateur;
import com.food.Repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RefrigerateurService {

    private final RefrigerateurRepository refrigerateurRepository;
    private final UserRepository userRepository;

    // Add a new refrigerator
    public Refrigerateur addRefrigerateur(Refrigerateur refrigerateur) {
        return refrigerateurRepository.save(refrigerateur);
    }

    // Get all refrigerators
    public List<Refrigerateur> getAllRefrigerateurs() {
        return refrigerateurRepository.findAll();
    }

    // Get refrigerators by donor ID
    public List<Refrigerateur> getRefrigerateursByDonateurId(Long donateurId) {
        return refrigerateurRepository.findByDonateur_Iduser(donateurId);
    }

    // Get refrigerator by ID
    public Optional<Refrigerateur> getRefrigerateurById(Long id) {
        return refrigerateurRepository.findById(id);
    }

    // Update a refrigerator
    public Refrigerateur updateRefrigerateur(Long id, Refrigerateur refrigerateur) {
        if (refrigerateurRepository.existsById(id)) {
            refrigerateur.setId(id);
            return refrigerateurRepository.save(refrigerateur);
        }
        return null;
    }

    // Delete a refrigerator
    public boolean deleteRefrigerateur(Long id) {
        if (refrigerateurRepository.existsById(id)) {
            refrigerateurRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
