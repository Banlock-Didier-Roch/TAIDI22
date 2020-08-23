package org.taidi.gestion_entrees.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taidi.gestion_entrees.domaine.Utilisateur;
import org.taidi.gestion_entrees.repository.UtilisateurRepository;

import java.util.List;

@Service
public class UtilisateurService {
    @Autowired
    private UtilisateurRepository rep;
    public List<Utilisateur> listAll(){
        return rep.findAll();
    }
    public void save(Utilisateur utilisateur){
        rep.save(utilisateur);
    }
    public Utilisateur get(Long id){
        return rep.findById(id).get();
    }
    public void delete(long id ){
        rep.deleteById(id);
    }

}

