package com.EventickNow.security.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.EventickNow.security.dto.EventoRequest;
import com.EventickNow.security.entity.EventoEntity;
import com.EventickNow.security.entity.Response;
import com.EventickNow.security.entity.UsuarioEntity;
import com.EventickNow.security.repository.IEventoRepository;
import com.EventickNow.security.repository.IUsuarioRepository;

@Service
public class EventoService {

	@Autowired
	private IEventoRepository eventoRepository;
	
	@Autowired
	private IUsuarioRepository usuarioRepository;
	
	//---------- Convertir imagen a Byte[]
	private byte[] convertMultipartFileToByteArray(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error converting MultipartFile to byte[]: " + e.getMessage());
        }
    }
	
	//----------- Consultar todos -------------------------------------
	public Response<EventoEntity> consultarTodos() {
		Response<EventoEntity> response = new Response<EventoEntity>();
		List<EventoEntity> lista = eventoRepository.findAll();

		if (lista.isEmpty()) {
			response.setMessage("No se encontraron datos");
		} else {
			response.setMessage("Consulta Correcta");
		}
		response.setStatus("OK");
		response.setList(lista);
		response.setCount(lista.size());
		return response;
	}
	
	//----------- Guardar  -------------------------------------
	
	public Response<EventoEntity> guardarEvento(MultipartFile imagenFile, EventoRequest evento){
		Response<EventoEntity> response = new Response<EventoEntity>();
		
		Optional<UsuarioEntity> optionalUsuario = usuarioRepository.findById(evento.getIdOrganizador());
		UsuarioEntity usuario = null;
		byte[] imagenBytes = convertMultipartFileToByteArray(imagenFile);

		
		EventoEntity evento1 = null;
		EventoEntity evento2 = null;
		
		if(optionalUsuario.isPresent()) {
			
			usuario = optionalUsuario.get();
			
			evento1 = new EventoEntity();
			
			evento1.setIdOrganizador(usuario);
			evento1.setNomEvento(evento.getNomEvento());
			evento1.setFecha(evento.getFecha());
			evento1.setUbicacion(evento.getUbicacion());
			evento1.setDetalles(evento.getDetalles());
			evento1.setEstatus(0);
			evento1.setImagen(imagenBytes);
			
			evento2 = eventoRepository.save(evento1);
			
			
			response.setStatus("OK");
			response.setMessage("Guardado correctamente");
			response.setData(evento2);
		}else {
			response.setStatus("ERROR");
			response.setMessage("El usuario no existe");
			response.setData(null);
		}
		
		return response;
		
	}
	

}
