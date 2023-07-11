package com.EventickNow.security.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtDto {

	private String token;
    private String bearer = "Bearer";
    private String emailUsuario;
    private Collection<? extends GrantedAuthority> authorities;

    public JwtDto(String token, String emailUsuario, Collection<? extends GrantedAuthority> authorities) {
        this.token = token;
        this.emailUsuario = emailUsuario;
        this.authorities = authorities;
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

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}
