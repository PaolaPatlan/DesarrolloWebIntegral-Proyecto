package com.EventickNow.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.EventickNow.security.entity.Rol;
import com.EventickNow.security.enums.RolNombre;
import com.EventickNow.security.repository.IRolRepository;


@Service
@Transactional
public class RolService {
	
	@Autowired
	IRolRepository rolRepository;

	public Optional<Rol> getByRolNombre(RolNombre rolNombre){
		return rolRepository.findByRolNombre(rolNombre);
	}
	
	public void save(Rol rol) {
		rolRepository.save(rol);
	}
}
