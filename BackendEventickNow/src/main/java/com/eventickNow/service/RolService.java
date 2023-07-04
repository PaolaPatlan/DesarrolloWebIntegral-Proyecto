package com.eventickNow.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventickNow.enums.RolNombre;
import com.eventickNow.model.entity.Rol;
import com.eventickNow.repository.IRolRepository;

@Service
@Transactional
public class RolService {
	
	@Autowired
	IRolRepository rolRepository;

	public Optional<Rol> getByRolNombre(RolNombre rolNombre){
		return rolRepository.findByRolNombre(rolNombre);
	}
}
