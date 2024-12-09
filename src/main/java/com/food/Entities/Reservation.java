package com.food.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.io.Serializable;
import java.util.Date;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Reservation implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    Boolean reponse;

    @ManyToOne
    private Surplus surplus;

    @ManyToOne
    private User beneficiaire;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateReservation;


    // Custom constructor for JPQL queries
    public Reservation(Long id, String surplusTitle, String beneficiaireNom, String beneficiairePrenom, Boolean reponse, Date dateReservation) {
        this.id = id;
        this.surplus = new Surplus();
        this.surplus.setTitre(surplusTitle);
        this.beneficiaire = new User();
        this.beneficiaire.setNom(beneficiaireNom);
        this.beneficiaire.setPrenom(beneficiairePrenom);
        this.reponse = reponse;
        this.dateReservation = dateReservation;
    }

}
