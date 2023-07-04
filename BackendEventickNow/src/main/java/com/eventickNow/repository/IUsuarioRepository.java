package com.eventickNow.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eventickNow.model.entity.UsuarioEntity;

public interface IUsuarioRepository extends JpaRepository<UsuarioEntity, Integer>{

	Optional<UsuarioEntity> findByCorreoElectronicoIgnoreCase(String correo);
//	/List<UsuarioEntity> findByEstatusOrderByApellidoPaternoAscApellidoMaternoAscNombreUsuarioAsc(Integer estatus);
	Page<UsuarioEntity> findByEstatus(Integer estatus, Pageable pageable);
//	@Query("SELECT u FROM UsuarioEntity u WHERE CONCAT( u.nombreUsuario,' ',u.apellidoPaterno,' ',"
//			+ "u.apellidoMaterno,' ' , u.correoElectronico) LIKE %?1%")		
//	Page<UsuarioEntity> findAll(String search, Pageable pageable);
	Optional<UsuarioEntity> findByCorreoElectronicoIgnoreCaseAndEstatus(String correo, Integer estatus);
	//@Query("SELECT d FROM UsuarioEntity d WHERE CODIGO_VERIFICACION =:id ")
	Optional<UsuarioEntity> findBycodigoVerificacion(@Param("id") String codigo);
	
	Optional<UsuarioEntity> findByCorreoE(String correoElectronico);
	boolean existsByCorreoE(String correoElectronico);
	
	
	
}
