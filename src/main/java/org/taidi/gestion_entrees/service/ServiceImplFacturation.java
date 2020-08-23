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
public class ServiceImplFacturation implements IServiceFacturation {
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
    public Commande getCommandeById(Long id) {
        return commandeRepository.findById(id).get();
    }

    @Override
    public List<Commande> getCommandes() {
        return commandeRepository.findAll();
    }

    @Override
    public List<Command_has_produit> getProduitsCommandes(Long id) {
        return chp_repository.findAllByCommande(id);
    }

    @Override
    public Produit enregistrerProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public List<Produit> getProduits(String service) {
        return produitRepository.findAllByService(service);
    }

    @Override
    public Command_has_produit enregistrerCHP(Command_has_produit chp) {
        return chp_repository.save(chp);
    }
}
