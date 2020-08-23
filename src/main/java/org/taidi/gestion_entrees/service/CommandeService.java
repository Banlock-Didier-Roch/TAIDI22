package org.taidi.gestion_entrees.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.taidi.gestion_entrees.domaine.Command_has_produit;
import org.taidi.gestion_entrees.domaine.Commande;
import org.taidi.gestion_entrees.domaine.Produit;
import org.taidi.gestion_entrees.repository.CommandeRepository;
import org.taidi.gestion_entrees.repository.ProduitRepository;

import java.util.Date;
import java.util.List;

@Service
public class CommandeService {
    @Autowired
    private CommandeRepository crep;

    @Autowired
    ProduitRepository produitRepository;

    public List<Commande> listAll(){
        return crep.findAll();
    }
    public List afficherScore (){
        return crep.findProduit_revenue();
    }

    public List<Commande> findCommandeIntervalle(String datedebut, String datefin) {
        return crep.findCommandeIntervalle(datedebut, datefin);
    }

    public List<Produit> findByCommande(Long commandeId) {
        return produitRepository.findByCommande(commandeId);
    }



}
