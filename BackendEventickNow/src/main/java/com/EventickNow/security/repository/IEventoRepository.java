package com.EventickNow.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EventickNow.security.entity.EventoEntity;

public interface IEventoRepository extends JpaRepository<EventoEntity, Integer>{
	
	

}
