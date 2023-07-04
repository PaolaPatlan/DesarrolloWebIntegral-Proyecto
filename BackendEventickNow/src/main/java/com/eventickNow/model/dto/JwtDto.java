package com.eventickNow.model.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtDto {
	private String token;
	private String bearer = "Bearer";
	private String emailUsuario;
	private Collection<? extends GrantedAuthority> authorities;
}
