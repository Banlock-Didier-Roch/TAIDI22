package org.taidi.gestion_entrees.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.taidi.gestion_entrees.domaine.Commande;
import org.taidi.gestion_entrees.domaine.Produit;

import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Long> {

    @Query("select p from Produit p where p.utilisateur.id =:id")
    List<Produit> findAllByUser(@Param("id") Long id);

    @Query("select chp.produit from Command_has_produit chp where chp.commande.id =:commande")
    List<Produit> findByCommande(Long commande);

    List<Produit> findAllByService(String Service);

}
