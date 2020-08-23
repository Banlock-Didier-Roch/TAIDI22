package org.taidi.gestion_entrees.repository;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class ProduitRepositoryImpl {
    @PersistenceContext
    private EntityManager entityManager;
    private int limit = 5;

    public List findOrderCountProduit(String datedebut, String datefin){
        return entityManager.createQuery("select chp.produit, sum(chp.quantite) from Command_has_produit chp where chp.produit.service = 'restauration' and chp.commande.date BETWEEN :datedebut and :datefin group by chp.produit order by count(chp.produit) DESC ").setMaxResults(limit).setParameter("datedebut",datedebut).setParameter("datefin", datefin).getResultList();
    }
}
