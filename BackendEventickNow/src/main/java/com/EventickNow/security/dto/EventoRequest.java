package com.EventickNow.security.dto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EventoRequest {

	private String nomEvento;
	
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	private Date fecha;
	
	private String ubicacion;
	
	private String detalles;
	
	private Integer estatus;
	
	private Double costo;
	
	private Integer cantBoletos;
	
	private MultipartFile imagen;
	
	private Integer idOrganizador;
}
