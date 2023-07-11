package com.EventickNow.security.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.EventickNow.security.entity.Rol;
import com.EventickNow.security.enums.RolNombre;
import com.EventickNow.security.service.RolService;


@Component
public class CreateRoles implements CommandLineRunner{

	@Autowired
	RolService rolService;

	@Override
	public void run(String... args) throws Exception {
		Rol rolAdmin = new Rol(RolNombre.ROLE_ADMIN);
		Rol rolCreador = new Rol(RolNombre.ROLE_CREADOR);
		Rol rolUsuario = new Rol(RolNombre.ROLE_USUARIO);
		
		rolService.save(rolAdmin);
		rolService.save(rolCreador);
		rolService.save(rolUsuario);
		
	}
	
}
