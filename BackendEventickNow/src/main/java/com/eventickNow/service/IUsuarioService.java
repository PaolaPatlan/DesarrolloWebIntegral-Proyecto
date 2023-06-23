package com.eventickNow.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.eventickNow.model.dto.SingleResponse;
import com.eventickNow.model.entity.UsuarioEntity;

public interface IUsuarioService {
	SingleResponse<List<UsuarioEntity>> consultarUsuarios();
	public SingleResponse<UsuarioEntity> crearUsuario(UsuarioEntity usuario);
	public SingleResponse<UsuarioEntity> actualizarUsuario(UsuarioEntity usuarios);
	public SingleResponse<UsuarioEntity> eliminarUsuario(Integer idUsuario);
	SingleResponse<List<UsuarioEntity>> consultarUsuariosActivos();
	SingleResponse<Page<UsuarioEntity>> consultarPorPaginas(int noPagina, String campo, String direccion, String buscar);
	SingleResponse<UsuarioEntity> detalleUsuario(Integer idUsuario);
	SingleResponse<UsuarioEntity> loginUsuario(UsuarioEntity usuario);
	

}
