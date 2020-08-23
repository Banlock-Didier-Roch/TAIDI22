package org.taidi.gestion_entrees.domaine;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String designation;
    private String service;
    private double prix;
    private String reference;
    private String photo;

    @ManyToOne
    private Utilisateur utilisateur;

    public long getId() {
        return id;
    }

    public String getDesignation() {
        return designation;
    }

    public String getService() {
        return service;
    }

    public double getPrix() {
        return prix;
    }

    public String getReference() {
        return reference;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }
}
