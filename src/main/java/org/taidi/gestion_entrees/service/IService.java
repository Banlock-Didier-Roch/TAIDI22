package org.taidi.gestion_entrees.service;


import org.springframework.data.repository.query.Param;
import org.taidi.gestion_entrees.domaine.Command_has_produit;
import org.taidi.gestion_entrees.domaine.Commande;
import org.taidi.gestion_entrees.domaine.Produit;

import java.util.List;


public interface IService {
    //Gestion commandes
    public Commande enregistrerCommande(Commande commande);
    public List<Commande> getCommandes();
    public List<Commande> findCommandeIntervalle(String datedebut, String datefin);

    //Gestion produits
    public Produit enregistrerProduit(Produit produit);
    public List<Produit> getProduits(String service);
    public List<Produit> findByCommande(Long commandeId);

    //Gestion CHP
    public List<Command_has_produit> findCHP(Long id);
    List findProduit_revenues(String datedebut, String datefin);

}
