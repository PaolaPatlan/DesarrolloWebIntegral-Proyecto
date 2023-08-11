import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EventosResponse } from 'src/app/shared/models/administrador';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Evento } from 'src/app/shared/models/evento';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent {
  eventos: EventosResponse[] = [];
  numEven: number;
  boton:false;

  public terminoBusqueda = '';
  evento: Evento = { 
    idEvento   :0,
    nomEvento  :'',
    fecha      :'',
    ubicacion  :'',
    detalles   :'',
    estatus    :'',
    costo      :'',
    cantBoleto :'',
    imagen     :'',
  };

  constructor(private userService: UsuarioService){
     // Suscripción para realizar la búsqueda después de un retraso de 500ms
     this.busquedaSubject
     .pipe(debounceTime(500), distinctUntilChanged())
     .subscribe((terminoBusqueda: string) => {
       this.realizarBusquedaEnServidor(terminoBusqueda); // Aquí puedes hacer la llamada a tu servidor para buscar eventos
     });
  }

  ngOnInit(): void {
    this.eventosTodos();
  }

  comparEventos(eventoId: number, numEven:number, boletos:number){
    this.evento.idEvento = eventoId;
    console.log(this.evento.idEvento);
    console.log("Esta es la cantidad de boletos"+numEven)
    if (numEven > boletos ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No puedes compar mas boletos de los existentes',
        showConfirmButton: false,
        timer: 1500
      });
      this.eventosTodos();
      return;
    }
    this.userService.comparBoletos(this.evento, numEven).subscribe((data) =>{
      if (data.data.cantBoletos <= 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Los boletos se han agotado',
          showConfirmButton: false,
          timer: 1500
        });
        this.eventosTodos();
        return;
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se comprado el boleto correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      // Vuelve a cargar la lista de eventos después de realizar la compra
      this.eventosTodos();
    });
  }

  eventosTodos(): void {
    this.numEven = 0;
    this.userService.getEventosTod().subscribe((data) => {
      this.eventos = data.list.map((evento) => ({ ...evento, numEven: 0 }));
      // Procesa la imagen
      this.eventos.forEach((evento) => {
        this.getBase64Image(evento.imagen).then((imageUrl) => {
          evento.imagen = imageUrl;
          evento.bytesImagen = imageUrl;
        });
      });
    });
    this.realizarBusquedaEnServidor(this.terminoBusqueda);
  }

  private busquedaSubject = new Subject<string>();
  // Inicializar el objeto con la propiedad detalles

  resultadosBusqueda: any[] = [];

  realizarBusqueda() {
    // Emitir el término de búsqueda para realizar la búsqueda después del retraso
    this.busquedaSubject.next(this.terminoBusqueda);
  }


  realizarBusquedaEnServidor(terminoBusqueda: string) {
    if (terminoBusqueda.trim() !== '') {
      this.evento.detalles = terminoBusqueda;
      // Implementa aquí la lógica para buscar eventos en tu servidor
      this.userService.buscarEvento(this.evento).subscribe(data => {
        this.resultadosBusqueda = data.list.map((evento) => ({ ...evento, numEven: 0 }));
        for (let index = 0; index < this.resultadosBusqueda.length; index++) {
          const element = this.resultadosBusqueda[index];
          this.getBase64Image(element.imagen).then((imageUrl) => {
            element.imagen = imageUrl;
          });
        }

        console.log(data.list);
      });
    } else {
      this.resultadosBusqueda = [];
    }
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