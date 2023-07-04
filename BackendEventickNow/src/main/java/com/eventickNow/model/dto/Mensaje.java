package com.eventickNow.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Mensaje {
	public Mensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	private String mensaje;

}
