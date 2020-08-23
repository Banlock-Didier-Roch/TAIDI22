package org.taidi.gestion_entrees.presentation.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.taidi.gestion_entrees.domaine.Command_has_produit;
import org.taidi.gestion_entrees.domaine.Commande;
import org.taidi.gestion_entrees.domaine.Produit;
import org.taidi.gestion_entrees.repository.CHP_Repository;
import org.taidi.gestion_entrees.repository.CommandeRepository;
import org.taidi.gestion_entrees.repository.ProduitRepository;
import org.taidi.gestion_entrees.repository.ProduitRepositoryImpl;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/gestionTAIDI/api")
public class TestApi {
    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CHP_Repository chp_repository;

    @Autowired
    ProduitRepositoryImpl repository;

    /*@RequestMapping(value = "/chp_api", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String listeProduitsCommandesApi(@RequestParam Long idC ) {
        List object = chp_repository.findAllByCommande(idC);
        Object[] objects=(Object[])object.get(0);
        Produit produit = (Produit) objects[0];
        return produit.getDesignation()+objects[1];
    }*/

    @RequestMapping(value = "/chp_api4/{datedebut}/{datefin}", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List listeProduitsOccurencesApi(@PathVariable String datedebut, @PathVariable String datefin) {
        return  repository.findOrderCountProduit(datedebut,datefin);
    }

    @RequestMapping(value = "/chp_api1", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List listeProduitsOccurencesApi1() {
        return  chp_repository.findOrderCountProduit1();
    }

    @RequestMapping(value = "/chp_api2", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List listeProduitsOccurencesApi2() {
        return  chp_repository.findOrderCountProduit2();
    }

    @RequestMapping(value = "/chp_api3", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List listeProduitsOccurencesApi3() {
        return  chp_repository.findOrderCountProduit3();
    }

    /*@RequestMapping(value = "/chp_apiP", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List listeProduitsOccurencesApiP() {
        return  chp_repository.findProduit_revenues();
    }*/

}
