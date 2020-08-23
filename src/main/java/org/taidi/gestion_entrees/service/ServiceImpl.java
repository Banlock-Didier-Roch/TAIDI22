package org.taidi.gestion_entrees.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taidi.gestion_entrees.domaine.Command_has_produit;
import org.taidi.gestion_entrees.domaine.Commande;
import org.taidi.gestion_entrees.domaine.Produit;
import org.taidi.gestion_entrees.repository.CHP_Repository;
import org.taidi.gestion_entrees.repository.CommandeRepository;
import org.taidi.gestion_entrees.repository.ProduitRepository;

import java.util.List;

@Service
public class ServiceImpl implements IService {
    @Autowired
    CommandeRepository commandeRepository;

    @Autowired
    ProduitRepository produitRepository;

    @Autowired
    CHP_Repository chp_repository;


    @Override
    public Commande enregistrerCommande(Commande commande) {
        return commandeRepository.save(commande);
    }

    @Override
    public List<Commande> getCommandes() {
        return null;
    }

    @Override
    public List<Commande> findCommandeIntervalle(String datedebut, String datefin) {
        return commandeRepository.findCommandeIntervalle(datedebut, datefin);
    }

 /*   @Override
    public List<Commande> getCommandes() {
        return commandeRepository.findAll();
    }*/

    @Override
    public Produit enregistrerProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public List<Produit> getProduits(String service) {
        return produitRepository.findAllByService(service);
    }

    @Override
    public List<Produit> findByCommande(Long commandeId) {
        return produitRepository.findByCommande(commandeId);
    }

    @Override
    public List<Command_has_produit> findCHP(Long id) {
        return chp_repository.findCHP(id);
    }

    @Override
    public List findProduit_revenues(String datedebut, String datefin) {
        return chp_repository.findProduit_revenues(datedebut,datefin);
    }

}
