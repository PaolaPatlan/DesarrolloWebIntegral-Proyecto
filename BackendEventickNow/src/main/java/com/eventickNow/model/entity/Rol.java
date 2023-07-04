package com.eventickNow.model.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.eventickNow.enums.RolNombre;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Rol implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4196560179005385478L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Enumerated(EnumType.STRING)
	private RolNombre rolNombre;
}
