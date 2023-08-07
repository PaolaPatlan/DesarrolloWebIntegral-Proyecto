import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

import { EventosResponse } from 'src/app/shared/models/administrador';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {
  eventos: EventosResponse[] = [];
  numEven: number;

  constructor(private userService: UsuarioService ){}

  ngOnInit(): void {
    this.eventosTodos();
  }

  eventosTodos(): void {
    this.userService.getEventosTod().subscribe((data) => {
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
