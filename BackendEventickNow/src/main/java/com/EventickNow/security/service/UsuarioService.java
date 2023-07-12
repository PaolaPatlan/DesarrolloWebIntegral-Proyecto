package com.EventickNow.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.EventickNow.security.entity.UsuarioEntity;
import com.EventickNow.security.repository.IUsuarioRepository;



@Service
@Transactional
public class UsuarioService {
	
	@Autowired
	private IUsuarioRepository usuarioRepository;

	public Optional<UsuarioEntity> getByCorreoE(String correoElectronico){
		Optional<UsuarioEntity> usuario = Optional.empty();
		usuario = usuarioRepository.findByCorreoElectronico(correoElectronico);
		usuario.get().setEstatus(1);
		return usuario;
	}

	public Optional<UsuarioEntity> getByCorreoEs(String correoElectronico){
		return usuarioRepository.findByCorreoElectronico(correoElectronico);
	}
	
	public boolean existsByCorreoE(String correoElectronico) {
		return usuarioRepository.existsByCorreoElectronico(correoElectronico);
	}
	
	public void save(UsuarioEntity usuario) {
		usuarioRepository.save(usuario);
		
		
	}
}
