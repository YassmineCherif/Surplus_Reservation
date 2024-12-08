package com.food.Controllers;
import com.food.Entities.*;
import com.food.Repositories.*;
import com.food.Services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/refrigerateurs")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class RefrigerateurController {

    private final RefrigerateurService refrigerateurService;
    private final UserService userService;

    private final UserRepository userRepository;

    // Add a refrigerator
    @PostMapping
    public ResponseEntity<Refrigerateur> addRefrigerateur(@RequestBody Refrigerateur refrigerateur) {
        // Validate donor
        User donateur = userRepository.findByLogin(refrigerateur.getDonateur().getLogin());
        if (donateur == null) {
            return ResponseEntity.badRequest().build();
        }

        refrigerateur.setDonateur(donateur);
        Refrigerateur createdRefrigerateur = refrigerateurService.addRefrigerateur(refrigerateur);
        return ResponseEntity.status(201).body(createdRefrigerateur);
    }

    // Get all refrigerators
    @GetMapping
    public ResponseEntity<List<Refrigerateur>> getAllRefrigerateurs() {
        List<Refrigerateur> refrigerateurs = refrigerateurService.getAllRefrigerateurs();
        return ResponseEntity.ok(refrigerateurs);
    }

    // Get refrigerators by donor ID
    @GetMapping("/donateur/{donateurId}")
    public ResponseEntity<List<Refrigerateur>> getRefrigerateursByDonateurId(@PathVariable Long donateurId) {
        List<Refrigerateur> refrigerateurs = refrigerateurService.getRefrigerateursByDonateurId(donateurId);
        return ResponseEntity.ok(refrigerateurs);
    }

    // Get a refrigerator by ID
    @GetMapping("/{id}")
    public ResponseEntity<Refrigerateur> getRefrigerateurById(@PathVariable Long id) {
        Optional<Refrigerateur> refrigerateur = refrigerateurService.getRefrigerateurById(id);
        return refrigerateur.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a refrigerator
    @PutMapping("/{id}")
    public ResponseEntity<Refrigerateur> updateRefrigerateur(@PathVariable Long id, @RequestBody Refrigerateur refrigerateur) {
        Refrigerateur updatedRefrigerateur = refrigerateurService.updateRefrigerateur(id, refrigerateur);
        return updatedRefrigerateur != null ? ResponseEntity.ok(updatedRefrigerateur) : ResponseEntity.notFound().build();
    }

    // Delete a refrigerator
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRefrigerateur(@PathVariable Long id) {
        boolean isDeleted = refrigerateurService.deleteRefrigerateur(id);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
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
