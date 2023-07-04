package com.eventickNow.model.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUsuario {

	@NotBlank
    private String correoElectronico;
    @NotBlank
    private String password;

}
