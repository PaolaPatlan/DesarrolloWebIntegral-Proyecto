package com.EventickNow.security.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtDto {

	private String token;
    private String bearer = "Bearer";
    private String emailUsuario;
    private Collection<? extends GrantedAuthority> autorities;

    public JwtDto(String token, String emailUsuario, Collection<? extends GrantedAuthority> autorities) {
        this.token = token;
        this.emailUsuario = emailUsuario;
        this.autorities = autorities;
        
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getBearer() {
        return bearer;
    }

    public void setBearer(String bearer) {
        this.bearer = bearer;
    }

    public String getemailUsuario() {
        return emailUsuario;
    }

    public void setemailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public Collection<? extends GrantedAuthority> getAutorities() {
    	return autorities;
    }
    
    public void setRol(Collection<? extends GrantedAuthority> autorities) {
    	this.autorities = autorities;
    }

}
