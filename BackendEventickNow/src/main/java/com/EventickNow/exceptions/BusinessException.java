
package com.EventickNow.exceptions;

import org.springframework.http.HttpStatus;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BusinessException extends RuntimeException {
	
	/**
	 * Numero serial
	 */
	private static final long serialVersionUID = -6654256023230766060L;
	
	/*
	 * Atributo HttpStatus
	 */
	private final HttpStatus httpEstatus;
	
	/**
	 * Codigo de respuesta
	 */
	private final String mensaje;

	
	/**
	 * Constructor de la clase
	 * 
	 * @param e            excepcion original
	 * @param responseCode mensaje de la excepcion
	 * @param httpEstatus  Estatus Http de respuesta
	 */
	public BusinessException(HttpStatus httpEstatus,final String mensaje) {
		super(mensaje);
		this.mensaje = mensaje;
		this.httpEstatus = httpEstatus;

	}
}
