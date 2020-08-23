package org.taidi.gestion_entrees.domaine;

import java.util.List;

public class CHP_Wrapper {

    long id;
    List<Command_has_produit> produits;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Command_has_produit> getProduits() {
        return produits;
    }

    public void setProduits(List<Command_has_produit> produits) {
        this.produits = produits;
    }
}
