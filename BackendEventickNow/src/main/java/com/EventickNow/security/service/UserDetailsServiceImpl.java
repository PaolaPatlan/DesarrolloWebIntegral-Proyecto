package com.EventickNow.security.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.EventickNow.security.entity.UsuarioEntity;
import com.EventickNow.security.entity.UsuarioPrincipal;


@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	UsuarioService usuarioService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UsuarioEntity usuario = usuarioService.getByCorreoEs(username).get();
		return UsuarioPrincipal.build(usuario);
	}

}
