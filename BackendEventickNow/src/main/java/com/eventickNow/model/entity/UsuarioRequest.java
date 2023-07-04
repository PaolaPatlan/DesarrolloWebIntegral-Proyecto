package com.eventickNow.model.entity;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioRequest implements UserDetails{
	
	private String nombre;
	private String correoElectronico;
	private String password;
	private Collection<? extends GrantedAuthority> authorities;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public String getUsername() {
		return correoElectronico;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public static UsuarioRequest build(UsuarioEntity usuario) {
		//Obtener los roles
		List<GrantedAuthority> authorities = 
				usuario.getRoles().stream().map(rol  -> new SimpleGrantedAuthority(
						rol.getRolNombre().name())).collect(Collectors.toList());
		
		return new UsuarioRequest();
		//return new UsuarioRequest(usuario.getNombre(), usuario.getCorreoElectronico(), usuario.getPassword(), authorities);
						
	}
}
