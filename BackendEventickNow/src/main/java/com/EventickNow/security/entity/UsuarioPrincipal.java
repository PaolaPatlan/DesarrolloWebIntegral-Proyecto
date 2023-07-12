package com.EventickNow.security.entity;

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
public class UsuarioPrincipal implements UserDetails{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3004433532952546620L;
	
	private String nombre;
	
	private String apellidoMaterno;

	private String apellidoPaterno;

	private String correoElectronico;
	
	private String password;
	
	private Collection<? extends GrantedAuthority> authorities;
	
	public UsuarioPrincipal(String nombre, String apellidoP, String apellidoM, String correoElectronico, String password, Collection<? extends GrantedAuthority> authorities) {
        this.nombre = nombre;
       // this.apellidos = apellidos;
        this.correoElectronico = correoElectronico;
        this.password = password;
        this.authorities = authorities;
    }
	
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

//	public String getApellidos() {
//		return apellidos;
//	}
//
//	public void setApellidos(String apellidos) {
//		this.apellidos = apellidos;
//	}
	
	public String getCorreoElectronico() {
		return correoElectronico;
	}

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
	
	public static UsuarioPrincipal build(UsuarioEntity usuario) {
		//Obtener los roles
		List<GrantedAuthority> authorities = 
				usuario.getRoles().stream().map(rol  -> new SimpleGrantedAuthority(
						rol.getRolNombre().name())).collect(Collectors.toList());
		
		return new UsuarioPrincipal(usuario.getNombre(), usuario.getApellidoMaterno(), usuario.getApellidoPaterno(), usuario.getCorreoElectronico(), usuario.getPassword(), authorities);
						
	}

	

	
}
