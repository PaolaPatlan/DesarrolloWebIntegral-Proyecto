package com.EventickNow.security.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "EVENTOS")
@Getter
@Setter
public class EventoEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7222847341176284771L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_EVENTO", length = 30)
	private Integer idEvento;
	
	@Column(name = "NOM_EVENTO", unique = true, length = 50 )
	private String nomEvento;
	
	@Column(name = "FECHA")
	private Date fecha;
	
	@Column(name = "UBICACION", nullable = false, length = 100)
	private String ubicacion;
	
	@Column(name = "DETALLES", nullable = false, length = 100)
	private String detalles;
	
	@Column(name = "ESTATUS", nullable = false)
	private Integer estatus;
	
	@Column(name = "COSTO", nullable = false)
	private Double costo;
	
	@Column(name = "CANT_BOLETOS", nullable = false)
	private Integer cantBoletos;
	
	@Column(name = "IMAGEN", length = 8388608)
	private byte[] imagen;
	
	@Transient
    private MultipartFile imagenFile;
	
	@ManyToOne
    @JoinColumn(name = "ID_ORGANIZADOR")
    private UsuarioEntity idOrganizador;
}
