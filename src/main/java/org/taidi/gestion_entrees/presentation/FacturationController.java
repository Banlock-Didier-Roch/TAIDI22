package org.taidi.gestion_entrees.presentation;

import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taidi.gestion_entrees.domaine.Command_has_produit;
import org.taidi.gestion_entrees.domaine.Commande;
import org.taidi.gestion_entrees.domaine.ProduitWrapper;
import org.taidi.gestion_entrees.service.IServiceFacturation;
import org.taidi.gestion_entrees.utils.Html2PdfService;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequiredArgsConstructor

public class FacturationController {

    @Autowired
    IServiceFacturation service;

    private final Html2PdfService html2PdfService;


    @RequestMapping(value = "/EnregistrerCommande", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public @ResponseBody
    Commande Submit(@RequestBody ProduitWrapper commande) {

        Command_has_produit chp;
        Commande commande1 = new Commande();

        //Enregistrement de la commande
        commande1.setDate(new SimpleDateFormat("YYYY-MM-dd").format(new Date()));
        //String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());
        commande1.setHeure(new SimpleDateFormat("HH:mm").format(Calendar.getInstance().getTime()));
        commande1.setPrix_total(commande.getPrixTotal());
        commande1.setService(commande.getService());

        commande1 = service.enregistrerCommande(commande1);

        //remplisage CHP
        for (int i=0; i<commande.getProduits().size();i++) {

            //Initialisation chp
            chp = new Command_has_produit();
            chp.setCommande(commande1);
            chp.setProduit(commande.getProduits().get(i));
            chp.setQuantite(commande.getQuantites()[i]);

            //Enregistrement chp
            service.enregistrerCHP(chp);
        }

        return commande1;
    }

    //Impression
    @RequestMapping(value = "/html2pdf/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity html2pdf(@PathVariable long id){
        Commande commande = service.getCommandeById(id);
        List<Command_has_produit> produits = service.getProduitsCommandes(id);
        Map<String, Object> data = new HashMap<>();
        data.put("chps", produits);
        data.put("total", produits.get(0).getCommande().getPrix_total());
        data.put("service", produits.get(0).getCommande().getService());

        InputStreamResource resource = html2PdfService.generateFacture(data);

        var headers = new HttpHeaders();
        //headers.add("Content-Disposition", "inline; filename=citiesreport.pdf");



        if(resource != null){
            return  ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        }else{
            return new ResponseEntity(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }




}
