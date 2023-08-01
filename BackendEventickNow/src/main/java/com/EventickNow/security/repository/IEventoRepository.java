package com.EventickNow.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.EventickNow.security.entity.EventoEntity;

public interface IEventoRepository extends JpaRepository<EventoEntity, Integer>{
	
	@Query("SELECT e FROM EventoEntity e INNER JOIN e.idOrganizador u WHERE u.idUsuario = :idOrganizador")
	List<EventoEntity> consultarPorIdOrganizador(@Param("idOrganizador") Integer idOrganizador);
	
	
	@Query("SELECT e FROM EventoEntity e WHERE e.idEvento = :idEvento")
	List<EventoEntity> cambiarEstatusEvento(@Param("idEvento") Integer idEvento);
	
	@Query("SELECT e FROM EventoEntity e WHERE e.estatus = 0")
	List<EventoEntity> consultarPendiente();
	
	
	@Query("SELECT e FROM EventoEntity e WHERE e.estatus = 1")
	List<EventoEntity> consultarAprobados();

	@Query("SELECT e FROM EventoEntity e WHERE " +
            "LOWER(e.nomEvento) LIKE %:texto% OR " +
            "LOWER(e.ubicacion) LIKE %:texto% OR " +
            "LOWER(e.detalles) LIKE %:texto%")
	List<EventoEntity> consultarFiltros(String texto);
	//List<EventoEntity> findByNomEventoContainingIgnoreCaseOrUbicacionContainingIgnoreCaseOrDetallesContainingIgnoreCase(String nombre, String ubicacion, String detalle);
}
