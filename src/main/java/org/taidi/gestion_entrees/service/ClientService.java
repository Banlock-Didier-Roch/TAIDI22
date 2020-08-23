package org.taidi.gestion_entrees.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taidi.gestion_entrees.domaine.Client;
import org.taidi.gestion_entrees.domaine.Utilisateur;
import org.taidi.gestion_entrees.repository.ClientRepository;
import org.taidi.gestion_entrees.repository.UtilisateurRepository;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository rep;
    public List<Client> listAll(){
        return rep.findAll();
    }
    public void save(Client client){
        rep.save(client);
    }
    public Client get(Long id){
        return rep.findById(id).get();
    }
    public void delete(long id ){
        rep.deleteById(id);
    }

}

