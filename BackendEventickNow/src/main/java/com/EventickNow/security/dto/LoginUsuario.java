package com.EventickNow.security.dto;

import javax.validation.constraints.NotBlank;

public class LoginUsuario {

	@NotBlank
    private String correoElectronico;
    @NotBlank
    private String password;

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
