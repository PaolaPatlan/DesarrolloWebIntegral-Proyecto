package com.EventickNow.security.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.EventickNow.security.dto.EventoRequest;
import com.EventickNow.security.entity.EventoEntity;
import com.EventickNow.security.entity.Response;
import com.EventickNow.security.service.EventoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/evento")
public class EventoController {
	
	@Autowired
	private EventoService eventoService;
	
	@GetMapping(path = "/consultarTodosEventos", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<EventoEntity>> consultartodos(){
		
		Response<EventoEntity> lista = eventoService.consultarTodos();
		
		return new ResponseEntity<Response<EventoEntity>> (lista, HttpStatus.OK);
		
	}
	
	@PostMapping(path = "/guardarEvento",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<EventoEntity>> guardarEvento (@RequestParam("imagenFile") MultipartFile imagenFile, @ModelAttribute EventoRequest evento){
		
		Response<EventoEntity> response = eventoService.guardarEvento(imagenFile, evento);
		return new ResponseEntity<Response<EventoEntity>> (response, HttpStatus.OK);
	}
	
	@PostMapping(path = "/consultarEventos/filtros", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<EventoEntity>> consultarEventosFiltros(@RequestBody EventoEntity evento){
		
		Response<EventoEntity> response = eventoService.consultarEventosFiltros(evento);
		
		return new ResponseEntity<Response<EventoEntity>> (response,HttpStatus.OK);
	}
	
	@GetMapping(path = "/consultarEventos/{idOrganizador}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<EventoEntity>> consultarEventosPorIdOrganizador(@PathVariable("idOrganizador") Integer idOrganizador){
		
		Response<EventoEntity> response = eventoService.consultarEventosPorIdOrganizador(idOrganizador);
		
		return new ResponseEntity<Response<EventoEntity>> (response,HttpStatus.OK);
	}
	
	
	@GetMapping(path = "/consultarEventos/pendientes",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<EventoEntity>> consultarEventosPendiente(){
		
		Response<EventoEntity> response = eventoService.consultarEventosPendientes();
		
		return new ResponseEntity<Response<EventoEntity>> (response,HttpStatus.OK);
	}
	
	@GetMapping(path = "/consultarEventos/aprobados",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<EventoEntity>> consultarEventosAprobados(){
		
		Response<EventoEntity> response = eventoService.consultarEventosAprobados();
		
		return new ResponseEntity<Response<EventoEntity>> (response,HttpStatus.OK);
	}
	
	@PutMapping(path = "/consultarEventos/actualizar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<EventoEntity>> actualizarEvento(@RequestBody EventoEntity evento) throws IOException {
		Response<EventoEntity> response = eventoService.cambiarEstatusEvento(evento);
		
		return new ResponseEntity<Response<EventoEntity>> (response,HttpStatus.OK);
	}
	
	@DeleteMapping(path = "/eliminarEvento/{idEvento}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<Integer>> eliminarEvento (@PathVariable("idEvento") Integer idEvento){
		
		Response<Integer> id = eventoService.eliminarEvento(idEvento);
		
		return new ResponseEntity<Response <Integer>>(id, HttpStatus.OK);
	}
	
	
}
