package com.EventickNow.security.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "USUARIOS")
@Getter
@Setter
public class UsuarioEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 773309159812067037L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_USUARIO", length = 30)
	private Integer idUsuario;
	
	@Column(name = "NOMBRE", nullable = false, length = 50)
	private String nombre;
	
	@Column(name = "CLAVE", nullable = false, length = 25)
	private String clave;
	
	@Column(name = "APELLIDO_PATERNO", nullable = false, length = 30)
	private String apellidoPaterno;
	
	@Column(name = "APELLIDO_MATERNO", nullable = false, length = 30)
	private String apellidoMaterno;
	
	@Column(name = "CORREO_ELECTRONICO", unique = true, length = 50)
	private String correoElectronico;
	
	@Column(name = "PASSWORD", length = 64)
	private String password;
	
	@Column(name = "ESTATUS", length = 1)
	private Integer estatus;
	
	@Column(name = "ROL", length = 1)
	private Integer roles;
	
	 public UsuarioEntity() {
	    }

	    public UsuarioEntity(@NotNull String nombre, @NotNull String apellidoM, @NotNull String apellidoP,@NotNull String correoElectronico, @NotNull String password,
	    		@NotNull Integer rol, @NotNull String clave) {
	        this.nombre = nombre;
	        this.apellidoMaterno = apellidoM;
	        this.apellidoPaterno = apellidoP;
	        this.correoElectronico = correoElectronico;
	        this.password = password;
	        this.roles = rol;
	        this.clave = clave;
	    }

	    public int getId() {
	        return idUsuario;
	    }

	    public void setId(int id) {
	        this.idUsuario = id;
	    }

	    public String getNombre() {
	        return nombre;
	    }

	    public void setNombre(String nombre) {
	        this.nombre = nombre;
	    }

//	    public String getApellidos() {
//	        return apellidos;
//	    }
//
//	    public void setApellidos(String apellidos) {
//	        this.apellidos = apellidos;
//	    }
	    
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

	    public Integer getRoles() {
	        return roles;
	    }

	    public void setRoles(Integer roles) {
	        this.roles = roles;
	    }
	    
	    public String getClave() {
	        return clave;
	    }

	    public void setClave(String clave) {
	        this.clave = clave;
	    }
}
