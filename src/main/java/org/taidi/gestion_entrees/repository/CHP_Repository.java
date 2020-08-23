package org.taidi.gestion_entrees.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.taidi.gestion_entrees.domaine.Command_has_produit;

import java.util.List;

public interface CHP_Repository extends JpaRepository<Command_has_produit, Long> {

    //Récupérer les produits et le nombre de fois qu'ils on été commandés
    @Query("select chp.produit, count(chp.produit) from Command_has_produit chp group by chp.produit order by count(chp.produit) DESC ")
    List findOrderCountPrduit();
    //List<Command_has_produit> findAllByIdCommand_id(@Param("id") Long id);

    //Récupérer les produits et le nombre de fois qu'ils on été commandés
    @Query("select chp.produit, sum(chp.quantite) from Command_has_produit chp where chp.produit.service = 'restauration' and chp.commande.date BETWEEN :datedebut and :datefin group by chp.produit order by count(chp.produit) DESC ")
    List findOrderCountProduit(@Param("datedebut") String datedebut, @Param("datefin") String datefin);


    //Récupérer les produits et le nombre de fois qu'ils on été commandés
    @Query("select chp.commande, chp.produit, count(chp.produit) from Command_has_produit chp where chp.produit.service = 'restauration' group by chp.produit order by count(chp.produit) DESC ")
    List findOrderCountProduit1();

    //Récupérer les produits et le nombre de fois qu'ils on été commandés
    @Query("select chp.commande, chp.produit, count(chp.produit) from Command_has_produit chp where chp.produit.service = 'SERIGRAPHIE' group by chp.produit order by count(chp.produit) DESC ")
    List findOrderCountProduit2();

    //Récupérer les produits et le nombre de fois qu'ils on été commandés
    @Query("select chp.commande, chp.produit, count(chp.produit) from Command_has_produit chp where chp.produit.service = 'TRAITEUR' group by chp.produit order by count(chp.produit) DESC ")
    List findOrderCountProduit3();

    @Query("select chp.produit.designation, chp.produit.prix*sum(chp.quantite) from Command_has_produit chp where chp.produit.service = 'restauration' and chp.commande.date BETWEEN :datedebut and :datefin group by chp.produit order by chp.produit.prix*sum(chp.quantite) DESC ")
    List findProduit_revenues(@Param("datedebut") String datedebut, @Param("datefin") String datefin);
    //List<Command_has_produit> findAllByIdCommand_id(@Param("id") Long id);

    //Récupérer les chps d'une commande spécifique
    @Query("select chp from Command_has_produit chp where chp.commande.id = :id ")
    List<Command_has_produit> findCHP(@Param("id") long id);

    //Recupérer les produits et les quantités en fonction de l'ID de la commande (FACTURATION)
    @Query("select chp from Command_has_produit chp join chp.commande c where c.id = :id")
    List<Command_has_produit> findAllByCommande(@Param("id") Long id);

}
