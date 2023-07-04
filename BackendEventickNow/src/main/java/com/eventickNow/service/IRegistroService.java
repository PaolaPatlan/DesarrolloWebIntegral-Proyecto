package com.eventickNow.service;

import javax.mail.MessagingException;

import com.eventickNow.model.dto.SingleResponse;
import com.eventickNow.model.entity.UsuarioEntity;

public interface IRegistroService {

	SingleResponse<UsuarioEntity> registerUser(UsuarioEntity clienteDireccion) throws MessagingException ;
	
	SingleResponse<UsuarioEntity> resetPassword(UsuarioEntity clienteDireccion) throws MessagingException ;
}
