package org.taidi.gestion_entrees.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.taidi.gestion_entrees.domaine.Command_has_produit;
import org.taidi.gestion_entrees.domaine.Commande;

import java.util.Date;
import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {


    //@Query("select chp.commande, chp.produit, count(chp.produit) from Command_has_produit chp where chp.produit.service = 'restauration' and chp.commande.date BETWEEN :datedebut and :datefin group by chp.produit order by count(chp.produit) DESC ")
    //List findOrderCountProduit(@Param("datedebut") String datedebut, @Param("datefin") String datefin);

    //Récupérer la liste des produits commandés dans une période donnée et montant total généré par chaque produit
    @Query("select chp.produit.designation, chp.produit.prix*sum(chp.quantite) from Command_has_produit chp where chp.produit.service = 'restauration' group by chp.produit order by chp.produit.prix*sum(chp.quantite) DESC ")
    List findProduit_revenue();


    //Récupérer la liste des commandes d'une période donnée
    @Query("select c from Commande c where c.date BETWEEN :datedebut and :datefin order by c.date DESC")
    List<Commande> findCommandeIntervalle(@Param("datedebut") String datedebut, @Param("datefin") String datefin);

}
