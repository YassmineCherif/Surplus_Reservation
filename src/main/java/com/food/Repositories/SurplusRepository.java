package com.food.Repositories;

import com.food.Entities.Surplus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurplusRepository extends JpaRepository<Surplus, Long> {


    List<Surplus> findByDonateur_Iduser(Long iduser);



}
