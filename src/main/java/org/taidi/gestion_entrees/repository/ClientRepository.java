package org.taidi.gestion_entrees.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taidi.gestion_entrees.domaine.Client;
import org.taidi.gestion_entrees.domaine.Utilisateur;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
