package com.food.Repositories;


import com.food.Entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Optional<Reservation> findBySurplusId(Long surplusId);

    List<Reservation> findAllBySurplusId(Long surplusId);



    @Query("SELECT new Reservation(r.id, r.surplus.titre, r.beneficiaire.nom, r.beneficiaire.prenom, r.reponse, r.dateReservation) " +
            "FROM Reservation r " +
            "WHERE r.surplus.id = :surplusId")
    List<Reservation> findReservationsBySurplusId(@Param("surplusId") Long surplusId);

}
