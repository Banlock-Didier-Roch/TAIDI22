package org.taidi.gestion_entrees.domaine;

import java.util.List;

public class ProduitWrapper {

    private List<Produit> produits;
    private int[] quantites;
    private double prixTotal;
    private String service;

    public List<Produit> getProduits() {
        return produits;
    }

    public void setProduits(List<Produit> produits) {
        this.produits = produits;
    }

    public int[] getQuantites() {
        return quantites;
    }

    public void setQuantites(int[] quantites) {
        this.quantites = quantites;
    }

    public double getPrixTotal() {
        return prixTotal;
    }

    public void setPrixTotal(double prixTotal) {
        this.prixTotal = prixTotal;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }
}
