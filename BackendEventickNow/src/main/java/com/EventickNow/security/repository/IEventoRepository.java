package com.EventickNow.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.EventickNow.security.entity.EventoEntity;

public interface IEventoRepository extends JpaRepository<EventoEntity, Integer>{
	
	@Query("SELECT e FROM EventoEntity e INNER JOIN e.idOrganizador u WHERE u.idUsuario = :idOrganizador")
	List<EventoEntity> consultarPorIdOrganizador(@Param("idOrganizador") Integer idOrganizador);

}
