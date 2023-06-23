package com.eventickNow.controller;

import java.util.List;

import javax.mail.MessagingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventickNow.model.dto.SingleResponse;
import com.eventickNow.model.entity.UsuarioEntity;
import com.eventickNow.service.RegistroService;
import com.eventickNow.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/registro")
public class RegistroController {


	@Autowired
    private RegistroService registroService;

    @PostMapping(path = "/cliente", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SingleResponse<UsuarioEntity>> registerUser(@RequestBody UsuarioEntity user) throws MessagingException {
    	
    	SingleResponse<UsuarioEntity> response = new SingleResponse<>();
    	response = registroService.registerUser(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PostMapping(path = "/password/{contraseña}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SingleResponse<UsuarioEntity>> resetPassword(@ModelAttribute UsuarioEntity user, @PathVariable("contraseña") String contraseña) throws MessagingException {
    	
    	SingleResponse<UsuarioEntity> response = new SingleResponse<>();
    	response = registroService.confirmPassword(user,contraseña);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "/confirmar/{idUsuario}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> confirmRegistration(@PathVariable("idUsuario") String idUsuario) {
    	registroService.confirmRegistration(idUsuario);
        return ResponseEntity.ok().build();
    }
	
}
