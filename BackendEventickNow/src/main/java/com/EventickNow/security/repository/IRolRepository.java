package com.EventickNow.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EventickNow.security.entity.Rol;
import com.EventickNow.security.enums.RolNombre;


public interface IRolRepository extends JpaRepository<Rol, Integer>{
	
	Optional<Rol> findByRolNombre(RolNombre rolNombre);

}
