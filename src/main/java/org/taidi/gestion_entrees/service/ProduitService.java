package org.taidi.gestion_entrees.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taidi.gestion_entrees.domaine.Produit;
import org.taidi.gestion_entrees.repository.ProduitRepository;

import java.util.List;

@Service
public class ProduitService {
    @Autowired
    private ProduitRepository rep;
    public List<Produit> listAll(){
        return rep.findAll();
    }
    public void save(Produit produit){
        rep.save(produit);
    }
    public Produit get(Long id){
        return rep.findById(id).get();
    }
    public void delete(long id ){
        rep.deleteById(id);
    }


}

