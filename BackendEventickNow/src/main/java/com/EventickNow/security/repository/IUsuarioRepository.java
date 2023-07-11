package com.EventickNow.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EventickNow.security.entity.UsuarioEntity;

public interface IUsuarioRepository extends JpaRepository<UsuarioEntity, Integer>{
	
	Optional<UsuarioEntity> findByCorreoElectronico(String correoElectronico);
	boolean existsByCorreoElectronico(String correoElectronico);

}
