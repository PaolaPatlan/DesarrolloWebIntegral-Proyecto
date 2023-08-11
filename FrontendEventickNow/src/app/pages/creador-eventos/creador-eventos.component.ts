import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { BaseForm } from 'src/app/shared/utils/base-form';
import { EventoService } from 'src/app/services/evento.service';
import { EventosResponse } from 'src/app/shared/models/eventoOrganizador';


@Component({
  selector: 'app-creador-eventos',
  templateUrl: './creador-eventos.component.html',
  styleUrls: ['./creador-eventos.component.scss']
})
export class CreadorEventosComponent implements OnInit{

  loginForm:any;
  eventos: EventosResponse[] =[];
  
  //Crea las intancias a utilizar 
  constructor(
    private fb: FormBuilder,
    public baseForm:BaseForm, 
    private router:Router,
    private eventoService: EventoService,
) {}
  
    ngOnInit(): void {
      this.eventosTodos()
    }
  
    eventosTodos(): void {
      const idUsuario = +localStorage.getItem('idUsuario'); // Obtenemos el idUsuario del localStorage y lo convertimos a número
  
      this.eventoService.getEventosTod(idUsuario).subscribe((data) => {
        this.eventos = data.list;
        // Procesa la imagen
        this.eventos.forEach((evento) => {
          this.getBase64Image(evento.imagen).then((imageUrl) => {
            evento.imagen = imageUrl;
          });
        });
      });
    }
  
    getBase64Image(base64Data: string): Promise<string> {
      return new Promise<string>((resolve) => {
        const imageUrl = `data:image/png;base64,${base64Data}`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => resolve(imageUrl);
      });
    }

}
