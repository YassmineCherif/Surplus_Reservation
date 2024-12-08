package com.food.Entities;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.io.Serializable;
import java.util.List;
import java.util.Set;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Surplus implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String description;
    private boolean reserved = false;

    @Temporal(TemporalType.DATE)
    private Date dateExpiration;

    @ManyToOne
    @JoinColumn(name = "donateur_id")
    private User donateur;
}

