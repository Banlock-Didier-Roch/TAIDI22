package org.taidi.gestion_entrees.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taidi.gestion_entrees.domaine.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
}
