package org.taidi.gestion_entrees.presentation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.taidi.gestion_entrees.domaine.Utilisateur;
import org.taidi.gestion_entrees.service.UtilisateurService;

import java.util.List;

@Controller
public class UtilisateurController {
    @Autowired// instancier et initiakiser les objet
    private UtilisateurService service;

    @PostMapping("/enregistrerUtilisateur")
    public String enregistrerUtilisateur(@ModelAttribute Utilisateur utilisateur,
                                         Model model) {

        // appel de la couche service injectée pour enregistrer un véhicule
        service.save(utilisateur);

        //return "redirect:listenseignants";
        return "redirect:gest_personnel";
    }

    @GetMapping("/gest_personnel")
    public String listerUtilisateurs(@ModelAttribute Utilisateur utilisateur,
                                     Model model) {
        List<Utilisateur> utilisateurs = service.listAll();
        model.addAttribute("listUtilisateurs", utilisateurs);
        model.addAttribute("utilisateur", new Utilisateur());

        return "gestion_personnel";
    }

    @GetMapping("/supprimer/{id}")
    public String supprimerUtilisateurs(@PathVariable Long id, @ModelAttribute Utilisateur utilisateur, Model model) {
        service.delete(id);

        return "redirect:/gest_personnel";
    }

    @PostMapping("/modifierUtilisateur")
    public String fermerModif(@ModelAttribute Utilisateur utilisateur,
                              Model model) {
        service.save(utilisateur);
        return "redirect:gest_personnel";
    }
}