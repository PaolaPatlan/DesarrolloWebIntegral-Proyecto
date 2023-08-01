import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador.service';
import { EventosResponse } from 'src/app/shared/models/administrador';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  eventos: EventosResponse[] = [];

  constructor(private adminService: AdministradorService ){}

  ngOnInit(): void {}

  /*
    Consulta todos los eventos pendientes
  */ 
  eventosPendientes(): void {
    this.adminService.getEventosPen().subscribe((data) => {
      this.eventos = data.list;

      // Procesa la imagen 
      this.eventos.forEach((evento) => {
        this.getBase64Image(evento.imagen).then((imageUrl) => {
          evento.imagen = imageUrl;
        });
      });
    });
  }

  /*
    Consulta todos los eventos aprobados
  */ 
    eventosAprobados(): void {
      this.adminService.getEventosApr().subscribe((data) => {
        this.eventos = data.list;
  
        // Procesa la imagen 
        this.eventos.forEach((evento) => {
          this.getBase64Image(evento.imagen).then((imageUrl) => {
            evento.imagen = imageUrl;
          });
        });
      });
    }

    /*
    Consulta todos los eventos 
  */ 

  eventosTodos(): void {
    this.adminService.getEventosTod().subscribe((data) => {
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

    /*
    Cambia el estatus a aprobado
  */ 

  cambiaEstatus(evento: EventosResponse, newEstatus: number): void {
    evento.estatus = newEstatus;
    this.adminService.updateEstatus(evento.idEvento, newEstatus).subscribe(
      (updatedEvento) => {
        console.log('Estatus updated on the server:', updatedEvento);
        window.location.reload();
      },
      (error) => {
        console.error('Error updating estatus on the server:', error);
      }
    );
  }

  /*
    Elimina un evento
  */

   deleteEvento(idEvento: any): void{
      
          if(idEvento){
            this.adminService.deleteEvento(idEvento).subscribe( ()=> {
              console.log("Evento eliminado exitosamente");
              window.location.reload();
            });
          }
          (error) => {
            console.error('Evento no eliminado exitosamente', error);
        }
      
      }
}
