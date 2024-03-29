package com.EventickNow.security.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.EventickNow.exceptions.BusinessException;
import com.EventickNow.security.dto.EventoRequest;
import com.EventickNow.security.entity.EventoEntity;
import com.EventickNow.security.entity.Response;
import com.EventickNow.security.entity.UsuarioEntity;
import com.EventickNow.security.repository.IEventoRepository;
import com.EventickNow.security.repository.IUsuarioRepository;

import antlr.debug.Event;

@Service
public class EventoService {

	@Autowired
	private IEventoRepository eventoRepository;

	@Autowired
	private IUsuarioRepository usuarioRepository;

	// ---------- Convertir imagen a Byte[]
	private byte[] convertMultipartFileToByteArray(MultipartFile file) {
		try {
			return file.getBytes();
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("Error converting MultipartFile to byte[]: " + e.getMessage());
		}
	}

	// ----------- Consultar todos -------------------------------------
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

	// -----------Compra Boletos -------------------------------------
	public Response<EventoEntity> compraBoletos(Integer boletos, EventoEntity evento) {
		Response<EventoEntity> response = new Response<>();

		Optional<EventoEntity> eventoN = eventoRepository.findById(evento.getIdEvento());

		if (eventoN == null) {
			response.setMessage("No hay resultados");
		} else {
			response.setMessage("Consulta correcta");
		}

		EventoEntity eventoUpdate = new EventoEntity();
		eventoUpdate = eventoN.get();
		Integer boletosActuales = eventoUpdate.getCantBoletos();
		boletosActuales = boletosActuales - boletos;
		eventoUpdate.setCantBoletos(boletosActuales);
		response.setData(eventoUpdate);
		eventoRepository.save(eventoUpdate);

		return response;

	}

	// ----------- Guardar -------------------------------------
	@Transactional
	public Response<EventoEntity> guardarEvento(EventoEntity evento) {
		Response<EventoEntity> response = new Response<EventoEntity>();

		Optional<UsuarioEntity> optionalUsuario = usuarioRepository.findById(evento.getIdOrganizador().getIdUsuario());
		UsuarioEntity usuario = null;
		// byte[] imagenBytes = convertMultipartFileToByteArray(imagenFile);

		EventoEntity evento1 = null;
		EventoEntity evento2 = null;

		if (optionalUsuario.isPresent()) {

			usuario = optionalUsuario.get();

			evento1 = new EventoEntity();

			evento1.setIdOrganizador(usuario);
			evento1.setNomEvento(evento.getNomEvento());
			evento1.setFecha(evento.getFecha());
			evento1.setUbicacion(evento.getUbicacion());
			evento1.setDetalles(evento.getDetalles());
			evento1.setEstatus(0);
			evento1.setCosto(evento.getCosto());
			evento1.setCantBoletos(evento.getCantBoletos());
			if (!evento.getMultipartFile().isEmpty() || evento.getMultipartFile() != null) {
				evento1.setNombreImagen(evento.getMultipartFile().getOriginalFilename());
				evento1.setTipoImagen(evento.getMultipartFile().getContentType());
				try {
					evento1.setImagen(evento.getMultipartFile().getBytes());
				} catch (IOException e) {
					throw new BusinessException(HttpStatus.BAD_REQUEST, "Error al procesar la imagen en el sistema.");
				}
			}
			evento2 = eventoRepository.save(evento1);

			response.setStatus("OK");
			response.setMessage("Guardado correctamente");
			response.setData(evento2);
		} else {
			response.setStatus("ERROR");
			response.setMessage("El usuario no existe");
			response.setData(null);
		}

		return response;

	}

	// ----------------Consultar eventos pendientes --------
	public Response<EventoEntity> consultarEventosPendientes() {
		Response<EventoEntity> response = new Response<>();

		List<EventoEntity> lista = eventoRepository.consultarPendiente();

		if (lista == null || lista.isEmpty()) {
			response.setMessage("No hay resultados");
		} else {
			response.setMessage("Consulta correcta");
		}

		response.setStatus("OK");
		response.setList(lista);

		return response;
	}

	// ----------------Consultar eventos pendientes --------
	public Response<EventoEntity> consultarEventosAprobados() {
		Response<EventoEntity> response = new Response<>();

		List<EventoEntity> lista = eventoRepository.consultarAprobados();

		if (lista == null || lista.isEmpty()) {
			response.setMessage("No hay resultados");
		} else {
			response.setMessage("Consulta correcta");
		}

		response.setStatus("OK");
		response.setList(lista);

		return response;
	}

	public Response<EventoEntity> cambiarEstatusEvento(EventoEntity evento) throws IOException {
		Response<EventoEntity> response = new Response<>();

		Optional<EventoEntity> eventoN = eventoRepository.findById(evento.getIdEvento());

		if (eventoN == null) {
			response.setMessage("No hay resultados");
		} else {
			response.setMessage("Consulta correcta");
		}

		EventoEntity eventoUpdate = new EventoEntity();
		eventoUpdate = eventoN.get();
		eventoUpdate.setEstatus(1);
		response.setData(eventoUpdate);
		eventoRepository.save(eventoUpdate);

		return response;
	}

	// ----------- Consultar eventos por idOrganizador
	// -------------------------------------
	public Response<EventoEntity> consultarEventosPorIdOrganizador(Integer idOrganizador) {
		Response<EventoEntity> response = new Response<>();

		List<EventoEntity> lista = eventoRepository.consultarPorIdOrganizador(idOrganizador);

		if (lista == null || lista.isEmpty()) {
			response.setMessage("No hay resultados");
		} else {
			response.setMessage("Consulta correcta");
		}

		response.setStatus("OK");
		response.setList(lista);
		if (lista != null) {
			response.setCount(lista.size());
		} else {
			response.setCount(0);
		}

		return response;
	}

	// ----------- Consultar eventos filtros
	// -------------------------------------
	public Response<EventoEntity> consultarEventosFiltros(EventoEntity evento) {
		Response<EventoEntity> response = new Response<>();

		List<EventoEntity> lista = eventoRepository.consultarFiltros(evento.getDetalles());

		if (lista == null || lista.isEmpty()) {
			response.setMessage("No hay resultados");
		} else {
			response.setMessage("Consulta correcta");
		}

		response.setStatus("OK");
		response.setList(lista);
		if (lista != null) {
			response.setCount(lista.size());
		} else {
			response.setCount(0);
		}

		return response;
	}

	// -----------------Eliminar-------------------
	public Response<Integer> eliminarEvento(Integer idEvento) {
		Response<Integer> response = new Response<Integer>();
		eventoRepository.deleteById(idEvento);

		response.setMessage("Eliminado correctamente");
		response.setStatus("OK");
		response.setData(idEvento);

		return response;
	}

}
