package org.taidi.gestion_entrees.presentation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.taidi.gestion_entrees.domaine.Client;
import org.taidi.gestion_entrees.domaine.Utilisateur;
import org.taidi.gestion_entrees.service.ClientService;
import org.taidi.gestion_entrees.service.UtilisateurService;

import java.util.List;

@Controller
public class ClientController {
    @Autowired// instancier et initiakiser les objet
    private ClientService service;

    @PostMapping("/enregistrerClient")
    public String enregistrerClient(@ModelAttribute Client client,
                                         Model model) {

        // appel de la couche service injectée pour enregistrer un véhicule
        service.save(client);

        //return "redirect:listenseignants";
        return "redirect:gest_client";
    }

    @GetMapping("/gest_client")
    public String listerClient(@ModelAttribute Client client,
                                     Model model) {
        List<Client> clients = service.listAll();
        model.addAttribute("listClients", clients);
        model.addAttribute("client", new Client());

        return "gest_client";
    }

    @GetMapping("/supprimer2/{id}")
    public String supprimerClients(@PathVariable Long id, @ModelAttribute Client client, Model model) {
        service.delete(id);

        return "redirect:/gest_client";
    }

    @PostMapping("/modifierClient")
    public String fermerModif(@ModelAttribute Client client,
                              Model model) {
        service.save(client);
        return "redirect:gest_client";
    }
}