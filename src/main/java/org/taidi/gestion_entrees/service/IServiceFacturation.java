package org.taidi.gestion_entrees.service;





import org.taidi.gestion_entrees.domaine.Command_has_produit;
import org.taidi.gestion_entrees.domaine.Commande;
import org.taidi.gestion_entrees.domaine.Produit;

import java.util.List;


public interface IServiceFacturation {
    //Gestion commandes
    public Commande enregistrerCommande(Commande commande);
    public Commande getCommandeById(Long id);
    public List<Commande> getCommandes();
    public List<Command_has_produit> getProduitsCommandes(Long id);

    //Gestion produits
    public Produit enregistrerProduit(Produit produit);
    public List<Produit> getProduits(String service);

    //Gestion chp
    public Command_has_produit enregistrerCHP(Command_has_produit chp);


}
