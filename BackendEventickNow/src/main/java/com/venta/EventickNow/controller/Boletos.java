package com.venta.EventickNow.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/boletos")
@CrossOrigin(origins = "*")
public class Boletos {
	
	
	@GetMapping(path = "/consultar")
	public String agregarProducto(){
		return "Consulta de boletos totales";
	}

}
