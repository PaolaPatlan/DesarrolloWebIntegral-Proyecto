package com.EventickNow.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.EventickNow.security.entity.UsuarioEntity;

public interface IUsuarioRepository extends JpaRepository<UsuarioEntity, Integer>{
	
	Optional<UsuarioEntity> findByCorreoElectronico(String correoElectronico);
	Optional<UsuarioEntity> findByClave(String clave);
	boolean existsByCorreoElectronico(String correoElectronico);
	Optional<UsuarioEntity> findByEstatus(@Param("id") String codigo);
	
}
