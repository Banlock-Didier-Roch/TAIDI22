package org.taidi.gestion_entrees.presentation;

import net.bytebuddy.dynamic.scaffold.TypeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.taidi.gestion_entrees.domaine.CHP_Wrapper;
import org.taidi.gestion_entrees.domaine.Command_has_produit;
import org.taidi.gestion_entrees.domaine.Commande;
import org.taidi.gestion_entrees.domaine.Produit;
import org.taidi.gestion_entrees.repository.CHP_Repository;
import org.taidi.gestion_entrees.repository.CommandeRepository;
import org.taidi.gestion_entrees.repository.ProduitRepositoryImpl;
import org.taidi.gestion_entrees.service.CommandeService;
import org.taidi.gestion_entrees.service.IService;

import java.text.SimpleDateFormat;
import java.util.*;

import static java.lang.Math.abs;

@Controller
public class CommandeControler {

    @Autowired// instancier et initialiser les objets
    private CommandeService service;

    @Autowired// instancier et initialiser les objets
    private IService service1;

    @Autowired
    ProduitRepositoryImpl repository;

    Calendar cal = Calendar.getInstance();
    String dateDebut;
    String dateFin;
    double recette = 0;


    @GetMapping(value = {"/restaurant", "/restaurant/{dateDebut1}/{dateFin1}"})
    public String listByPage(@PathVariable(required = false) String dateDebut1, @PathVariable(required = false) String dateFin1, Model model){
        if(dateDebut1==null&&dateFin1==null){
            cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());
            dateDebut = new SimpleDateFormat("YYYY-MM-dd").format(cal.getTime());
            cal.add(Calendar.DATE, 6);
            dateFin = new SimpleDateFormat("YYYY-MM-dd").format(cal.getTime());

            int currentPage = 1;

            List<Commande> commandes = service.findCommandeIntervalle(dateDebut, dateFin);
            CHP_Wrapper produitConteneur;
            List chps = new ArrayList();

            recette = 0;
            for (Commande commande: commandes) {
                produitConteneur = new CHP_Wrapper();
                produitConteneur.setId(commande.getId());
                produitConteneur.setProduits(service1.findCHP(commande.getId()));
                chps.add(produitConteneur);
                recette += commande.getPrix_total();

            }
            long totalItems = commandes.size();
            long totalPages = roundUp(totalItems, 10);

            model.addAttribute("currentPage", currentPage);
            model.addAttribute("totalItems", totalItems);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("listCommandes",commandes);
            model.addAttribute("recette",recette);
            model.addAttribute("chps",chps);
            model.addAttribute("MVE",service1.findProduit_revenues(dateDebut,dateFin));
            model.addAttribute("chartItems",repository.findOrderCountProduit(dateDebut,dateFin));
            return "restaurant";
        }else{
            int currentPage = 1;

            List<Commande> commandes = service.findCommandeIntervalle(dateDebut1, dateFin1);
            CHP_Wrapper produitConteneur;
            List chps = new ArrayList();

            recette = 0;
            for (Commande commande: commandes) {
                produitConteneur = new CHP_Wrapper();
                produitConteneur.setId(commande.getId());
                produitConteneur.setProduits(service1.findCHP(commande.getId()));
                chps.add(produitConteneur);
                recette += commande.getPrix_total();
            }

            long totalItems = commandes.size();
            long totalPages = roundUp(totalItems, 10);

            model.addAttribute("currentPage", currentPage);
            model.addAttribute("totalItems", totalItems);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("listCommandes",commandes);
            model.addAttribute("recette",recette);
            model.addAttribute("chps",chps);
            model.addAttribute("MVE",service1.findProduit_revenues(dateDebut1,dateFin1));
            model.addAttribute("chartItems",repository.findOrderCountProduit(dateDebut1,dateFin1));
            return "restaurant";
        }

    }

    @RequestMapping("/affichage")
    public String showScore (Model model){
        List listScore = service.afficherScore();
        model.addAttribute("listScore", listScore);
        return "restaurant";

    }

    public static long roundUp(long num, long divisor) {
        int sign = (num > 0 ? 1 : -1) * (divisor > 0 ? 1 : -1);
        return sign * (abs(num) + abs(divisor) - 1) / abs(divisor);
    }



}
