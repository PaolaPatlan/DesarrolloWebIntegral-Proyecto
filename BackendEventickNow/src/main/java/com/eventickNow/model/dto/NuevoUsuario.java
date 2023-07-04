package com.eventickNow.model.dto;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NuevoUsuario {
	@NotBlank
	private String nombre;
	@Email
	private String correoElectronico;
	@NotBlank
	private String password;
	private Set<String> roles = new HashSet<>();
}
