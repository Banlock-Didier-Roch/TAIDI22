package org.taidi.gestion_entrees.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.taidi.gestion_entrees.domaine.Produit;
import org.taidi.gestion_entrees.service.ProduitService;

import java.util.List;

@Controller
public class ProduitControler {
    @Autowired// instancier et initiakiser les objet
    private ProduitService service;

    @PostMapping("/enregistrerProduit")
    public String enregistrerProduit(@ModelAttribute Produit produit,
                                         Model model) {

        // appel de la couche service injectée pour enregistrer un véhicule
        service.save(produit);

        //return "redirect:listenseignants";
        return "redirect:gest_produit";
    }

    @GetMapping("/gest_produit")
    public String listerProduit(@ModelAttribute Produit produit,
                                     Model model) {
        List<Produit> produits = service.listAll();
        model.addAttribute("listProduits", produits);
        model.addAttribute("produit", new Produit());

        return "gest_produit";
    }

    @GetMapping("/supprimer1/{id}")
    public String supprimerProduits(@PathVariable Long id, @ModelAttribute Produit produit, Model model) {
        service.delete(id);

        return "redirect:/gest_produit";
    }

    @PostMapping("/modifierProduit")
    public String fermerModif(@ModelAttribute Produit produit,
                              Model model) {
        service.save(produit);
        return "redirect:gest_produit";
    }
}
