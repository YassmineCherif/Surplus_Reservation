package com.food.Repositories;

import com.food.Entities.Refrigerateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RefrigerateurRepository extends JpaRepository<Refrigerateur, Long> {
    List<Refrigerateur> findByDonateur_Iduser(Long iduser); // Use 'Iduser' instead of 'Id'
}
