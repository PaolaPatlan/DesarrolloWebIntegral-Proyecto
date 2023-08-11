import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador.service';
import { EventosResponse } from 'src/app/shared/models/administrador';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  //Mostrar botón de aprobar
  mostrarBoton :boolean = true;
  
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
        this.mostrarBoton = false;
  
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha aprobado el evento exitosamente.',
          showConfirmButton: false,
          timer: 1500
        });console.log('Estatus updated on the server:', updatedEvento);
        this.eventosTodos();

      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se ha logrado aprobar el evento.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  /*
    Elimina un evento
  */

   deleteEvento(idEvento: any): void{
      
          if(idEvento){
            this.adminService.deleteEvento(idEvento).subscribe( ()=> {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha rechazado el evento exitosamente.',
                showConfirmButton: false,
                timer: 1500
              });
              this.eventosTodos();
            });
          }
          (error) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'No se ha logrado rechazar el evento.',
              showConfirmButton: false,
              timer: 1500
            });
            this.eventosTodos();
        }
      
      }
}
