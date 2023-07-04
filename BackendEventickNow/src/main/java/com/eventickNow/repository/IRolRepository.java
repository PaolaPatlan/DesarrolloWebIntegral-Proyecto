package com.eventickNow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventickNow.enums.RolNombre;
import com.eventickNow.model.entity.Rol;

public interface IRolRepository extends JpaRepository<Rol, Integer>{
	Optional<Rol> findByRolNombre(RolNombre rolNombre);

}
