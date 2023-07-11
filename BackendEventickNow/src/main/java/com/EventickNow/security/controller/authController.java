package com.EventickNow.security.controller;

import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EventickNow.model.dto.Mensaje;
import com.EventickNow.security.dto.JwtDto;
import com.EventickNow.security.dto.LoginUsuario;
import com.EventickNow.security.dto.NuevoUsuario;
import com.EventickNow.security.entity.Rol;
import com.EventickNow.security.entity.UsuarioEntity;
import com.EventickNow.security.enums.RolNombre;
import com.EventickNow.security.jwt.JwtProvider;
import com.EventickNow.security.service.RolService;
import com.EventickNow.security.service.UsuarioService;


@RestController
@RequestMapping("/auth")
@CrossOrigin
public class authController {
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	RolService rolService;
	
	@Autowired
	JwtProvider jwtProvider;
	
	@PostMapping("/nuevo")
		public ResponseEntity<?> nuevo(@Valid @RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult){
			if(bindingResult.hasErrors())
				return new ResponseEntity(new Mensaje("Campos incorrectos"), HttpStatus.BAD_REQUEST);
			if(usuarioService.existsByCorreoE(nuevoUsuario.getCorreoElectronico()))
				return new ResponseEntity(new Mensaje("Ese email ya existe"), HttpStatus.BAD_REQUEST);
			UsuarioEntity usuario = new UsuarioEntity(nuevoUsuario.getNombre(),nuevoUsuario.getApellidos(), nuevoUsuario.getCorreoElectronico(), 
					passwordEncoder.encode(nuevoUsuario.getPassword()));
			Set<Rol> roles = new HashSet<>();
			Optional<Rol> usuarioRol = rolService.getByRolNombre(RolNombre.ROLE_USUARIO);
			if (usuarioRol.isPresent()) {
			    roles.add(usuarioRol.get());
			}

			Optional<Rol> creadorRol = rolService.getByRolNombre(RolNombre.ROLE_CREADOR);
			if (nuevoUsuario.getRoles().contains("creador") && creadorRol.isPresent()) {
			    roles.add(creadorRol.get());
			}

			/*roles.add(rolService.getByRolNombre(RolNombre.ROLE_USUARIO).get());
	        if(nuevoUsuario.getRoles().contains("creador"))
	            roles.add(rolService.getByRolNombre(RolNombre.ROLE_CREADOR).get());
	        if(nuevoUsuario.getRoles().contains("admin"))
	            roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());*/
	        usuario.setRoles(roles);
			usuarioService.save(usuario);
			return new ResponseEntity(new Mensaje("Usuario guardado"), HttpStatus.CREATED);
		}
	
	@PostMapping("/login")
	public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUsuario loginUsario, BindingResult bindingResult){
		if(bindingResult.hasErrors())
			return new ResponseEntity(new Mensaje("Email o contraseña incorrectos"), HttpStatus.BAD_REQUEST);
		Authentication authentication = 
				authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUsario.getCorreoElectronico(), loginUsario.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.genereteToken(authentication);
		UserDetails userDetails = (UserDetails)authentication.getPrincipal();
		JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities()); 
		//JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities()); 
		return new ResponseEntity(jwtDto, HttpStatus.OK);
	}
	
}
